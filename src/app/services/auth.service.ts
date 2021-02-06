import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.default.User>

  constructor(
    private firebaseAuth: AngularFireAuth,
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ){
    this.user = firebaseAuth.authState;
  }

  loginAluno(email: string, password: string){
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
      this.navCtrl.navigateRoot('aluno-menu');
    }).catch(err => {
      console.error(err);
    })
  }

  loginMotorista(email: string, password: string){
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
      this.navCtrl.navigateRoot('motorista-menu');
    }).catch(err => {
      console.error(err);
    })
  }

  logout(){
    this.firebaseAuth.signOut();
    this.navCtrl.navigateRoot('login');
  }

  currentUser(){
    return this.firebaseAuth.user;
  }

  getAuth(){
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) this.navCtrl.navigateRoot('aluno-menu');
    })
  }
}
