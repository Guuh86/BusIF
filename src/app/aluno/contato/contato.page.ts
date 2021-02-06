import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, NavController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Device } from '@ionic-native/device/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;

  reports = [];
  ref = firebase.default.database().ref('reports/');
  inputMatricula: string = '';
  inputDesc: string = '';
  devId: any;

  constructor(
    private toast: ToastController,
    private device: Device,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage,
    public navCtrl: NavController,
    private alertCtrl: AlertController    
  ) {
    this.ref.on('value', resp => {
      this.reports = snapshotToArray(resp);
    })
  }

  ngOnInit() {
  }

  async openGalery() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      const fileUri: string = await this.camera.getPicture(options);
      let file: string;

      if (this.platform.is('ios')) {
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));
      }
      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);

      const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

      this.uploadPicture(blob);
    } catch (error) {
      this.showToast(error);
    }
  }

  addReport(reports) {
    let newReport = this.ref.push();
    newReport.set(reports);
    this.inputMatricula = '';
    this.inputDesc = '';
    this.devId = this.device.uuid;
  }

  uploadPicture(blob: Blob) {
    const ref = this.afStorage.ref('reports/' + this.device.uuid);
    const task = ref.put(blob);
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
    this.showAlert();
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Formulário enviado!',
      message: 'Obrigado por ajudar a melhorar o BusIF App',
      buttons: ['OK'],
      animated: true
    })
    await alert.present();
  }

  showToast(msg) {
    this.toast.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }

}

export const snapshotToArray = snapshot => {
  let returnArray = [];

  snapshot.forEach(element => {
    let item = element.val();
    item.key = element.key;
    returnArray.push(item)
  });
  return returnArray;
}

