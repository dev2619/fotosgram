import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private userService: UserService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private uiService: UiService
  ) {
    this.loginFormGroup = this.fb.group({
      email: ['julian1409@gmail.com', Validators.required],
      password: '123456'
    });
  }

  ngAfterViewInit() {
    this.swiper = document.querySelector('swiper-container');
  }

  ngOnInit() {

  }

  swiper: any;

 
  loginFormGroup!: FormGroup;


  registerUser: User = {
    name: '',
    email: '',
    password: '',
    avatar: 'av-1.png'
  };

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const exists = await this.userService.logIn(this.loginUserEmail, this.loginUserPassword);
    if (exists) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      this.uiService.presentDangerToast('Usuario o contraseña incorrectos');
    }
  }

  async singUp(fSingUp: NgForm) {
    console.log(this.registerUser);
    if (fSingUp.invalid) {
      return;
    }
    const created = await this.userService.register(this.registerUser);
    if (created) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      this.uiService.presentDangerToast('Este correo ya existe');
    }
  }

  get loginUserEmail() {
    return this.loginFormGroup.get('email')?.value;
  }

  set loginUserEmail(value: any) {
    this.loginFormGroup.get('email')?.setValue(value);
  }

  get loginUserPassword() {
    return this.loginFormGroup.get('password')?.value;
  }

  set loginUserPassword(value: any) {
    this.loginFormGroup.get('password')?.setValue(value);
  }



  showLoginPage() {
    this.swiper!.swiper.slideTo(0);
  }

  showSingUpPage() {
    this.swiper!.swiper.slideTo(1);
  }
}
