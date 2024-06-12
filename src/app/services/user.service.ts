import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = 'null';
  private user: User = {};
  constructor(private storage: Storage, private http: HttpClient) {
    this.storage.create();
  }

  logIn(email: string, password: string) {
    const data = { email, password };
    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe((response: any) => {
        if (response.ok) {
          this.saveToken(response.token);
          resolve(true);
        } else {
          this.token = 'null';
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUser() {
    if (!this.user._id) {
      this.validToken();
    }
    return { ...this.user };
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', this.token);
  }

  register(user: User) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, user)
        .subscribe((response: any) => {
          if (response.ok) {
            this.saveToken(response.token);
            resolve(true);
          } else {
            this.token = 'null';
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  async validToken(): Promise<boolean> {
    await this.loadToken();
    if (!this.token) {
      this.storage.clear();
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = { 'x-json-token': this.token };
      this.http.get(`${URL}/user/`, { headers }).subscribe((response: any) => {
        if (response.ok) {
          this.user = response.user;
          resolve(true);
        } else {
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async loadToken() {
    this.token = await this.storage.get('token') || 'null';
  }


  updateUser(user: User) {
    const headers = new HttpHeaders({ 'x-json-token': this.token });
    return new Promise(resolve => {
      this.http.put(`${URL}/user/update`, user, { headers })
        .subscribe((response: any) => {
          if (response.ok) {
            this.saveToken(response.token);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });



  }

}
