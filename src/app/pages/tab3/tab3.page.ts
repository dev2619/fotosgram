import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = {};

  constructor(private userService: UserService,
    private toastController: ToastController,
    private uiService: UiService,
    private postService: PostsService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
  }


  async update(fUpdate: NgForm) {
    if (fUpdate.invalid) { return; }
    const updated = await this.userService.updateUser(this.user);
    console.log(updated);
    if (updated) {
      this.uiService.presentToast('Usuario Actualizado Correctamente');
    } else {
      this.uiService.presentDangerToast('Error al actualizar usuario')
    }

  }


  logout() {
    this.postService.postPage = 0;
    this.userService.logOut();

  }

}
