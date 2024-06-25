import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PostElement, ResponsePosts, UserPhoto } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { LoadingController, Platform } from '@ionic/angular';
const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postPage = 0;
  photos: UserPhoto[] = [];

  newPost = new EventEmitter<PostElement>()

  constructor(private http: HttpClient,
    private userService: UserService,
    private loadingCtrl: LoadingController,
  ) { }

  getPosts(pull: boolean = false) {
    if (pull) {
      this.postPage = 0;
    }
    this.postPage++;
    return this.http.get<ResponsePosts>(`${URL}/post/?page=${this.postPage}`);
  }

  createPost(post: any) {
    const headers = new HttpHeaders({ 'x-json-token': this.userService.token });

    return new Promise(resolve => {
      this.http.post(`${URL}/post`, post, { headers })
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.newPost.emit(resp.post);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }


  async uploadData(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();
    const url = `${URL}/post/upload`;
    const headers = new HttpHeaders({ 'x-json-token': this.userService.token });
    return new Promise(resolve => {
      this.http.post(url, formData, { headers })
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.newPost.emit(resp.post);
            loading.dismiss();
            resolve(true);
          } else {
            loading.dismiss();
            resolve(false);
          }
        });
    });
  }
}
