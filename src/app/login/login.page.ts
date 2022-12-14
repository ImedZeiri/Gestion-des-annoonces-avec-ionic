import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import {
  ToastController,
  LoadingController,
  NavController,
  Platform
} from "@ionic/angular";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user = {} as User;
  subscription: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: Auth,
    private navCtrl: NavController,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }
  async login({ user : User }) {
    try {
      const user = await signInWithEmailAndPassword(this.afAuth, this.user.email, this.user.password);
      return user;
    } catch (e) {
      return null;
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Enter email");
      return false;
    }

    if (!this.user.password) {
      this.showToast("Enter password");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }
}
