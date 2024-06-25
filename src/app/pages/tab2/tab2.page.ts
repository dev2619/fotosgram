import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { UserPhoto } from 'src/app/interfaces/interfaces';
import { Platform } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  loadingLocation = false;

  imageSrc = '';
  photos: UserPhoto[] = [];


  post = {
    message: '',
    cords: '',
    position: false
  }

  constructor(private postService: PostsService,
    private route: Router,
    private plt: Platform,
    private uiService: UiService
  ) { }

  async crearPost() {
    const created = await this.postService.createPost(this.post)
    if (created) {
      this.post = {
        message: '',
        cords: '',
        position: false
      }
      this.tempImages = [];
      this.route.navigateByUrl('/main/tabs/tab1')
    }
  }

  async getLocation() {
    if (!this.post.position) {
      this.post.cords = '';
      return;
    }
    this.loadingLocation = true;
    const coordinates = await Geolocation.getCurrentPosition();
    this.post.cords = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
    this.loadingLocation = false;

    console.log(this.post)
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      correctOrientation: true,

    });
    const imageUrl = image.webPath;
    this.imageSrc = imageUrl!;
    await this.processImage(image);
    this.tempImages.push(this.imageSrc);
  };


  async processImage(image: Photo) {
    const fileName = new Date().getTime() + '.jpeg';
    const base64Data = await this.readAsBase64(image);

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    const readFile = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: image.webPath!,
      data: `data:image/jpeg;base64,${readFile.data}`,
      name: 'f',
    });

    const imagen: UserPhoto = {
      filepath: base64Data,
      webviewPath: image.webPath!,
      data: `data:image/jpeg;base64,${readFile.data}`,
      name: fileName,
    };
    this.startUpload(imagen);
  }
  async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });
      return file.data;
    }
    else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async startUpload(file: UserPhoto) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('image', blob, file.name);
    const uploaded = await this.postService.uploadData(formData)
    if (uploaded) {
      this.uiService.presentToast('Image uploaded successfully');
    } else {
      this.uiService.presentDangerToast('Image could not be uploaded');
    }
  }


}
