import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router:Router) { }
  ionViewDidEnter() {
    GoogleAuth.initialize();
  }

  checkLoggedIn() {
    GoogleAuth.refresh().then((data) => {
      if (data.accessToken) {
        let navigationExtras: NavigationExtras = {
          state: {
            user: { type: 'existing', accessToken: data.accessToken, idToken: data.idToken }
          }
        };
        this.router.navigate(['landing'], navigationExtras);
      }
    }).catch(e => {
      if (e.type === 'userLoggedOut') {
        this.doLogin();
      }
    });
  }

  async doLogin() {
    const user = await GoogleAuth.signIn();
    if (user) { this.goToHome(user); }
  }

  goToHome(user) {
    let navigationExtras: NavigationExtras = { state: { user: user } };
    this.router.navigate(['landing'], navigationExtras);
    }
}
