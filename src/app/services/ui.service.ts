import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toastController: ToastController) { }
  public async presentDangerToast(message: string) {
    const toast = await this.toastController.create({
      header: message,
      buttons: [
        {
          icon: 'close',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ],
      position: 'top',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  public async presentToast(message: string) {
    const toast = await this.toastController.create({
      header: message,
      buttons: [
        {
          icon: 'close',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ],
      color: 'primary',
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }
}
