import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: Auth,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async register(user: User) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.afAuth,
        this.user.email,
        this.user.password
      );
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
