import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model";
import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { AngularFirestore } from 'angularfire2/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.page.html",
  styleUrls: ["./add-post.page.scss"]
})
export class AddPostPage implements OnInit {
  post = {} as Post;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: Auth,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async createPost(post: Post) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      try {
        await this.firestore.collection("posts").add(post);
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();
      this.navCtrl.navigateRoot("home");
    }
  }

  formValidation() {
    if (!this.post.title) {
      this.showToast("Enter title");
      return false;
    }

    if (!this.post.details) {
      this.showToast("Enter details");
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
