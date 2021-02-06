import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDwTfAQCmOC4AAktZydDchN07h1y47nYi0",
  authDomain: "busif-7c277.firebaseapp.com",
  databaseURL: "https://busif-7c277-default-rtdb.firebaseio.com",
  projectId: "busif-7c277",
  storageBucket: "busif-7c277.appspot.com",
  messagingSenderId: "611590824958",
  appId: "1:611590824958:web:dbe82a77aae266114d96af",
  measurementId: "G-V0SF12RWQT"
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();      
    firebase.default.initializeApp(config);
  }
}
