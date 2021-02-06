import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  markers = [];

  ref = firebase.default.database().ref('busLocations/');

  private loading: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    private device: Device,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.ref.on('value', resp => {
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if (data.uuid !== this.device.uuid) {
          let image = 'assets/img/bus.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
        } else {
          let image = 'assets/img/bus.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
        }
      });
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initMap();
    })
  }

  initMap() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 16,
        center: mylocation,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      this.updateGeolocation(this.device.uuid, data.coords.latitude, data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      let image = 'assets/img/bus.png';
      this.addMarker(updatelocation, image);
      this.setMapOnAll(this.map);
    });
  }

  updateGeolocation(uuid, lat, lng) {
    if (localStorage.getItem('mykey')) {
      firebase.default.database().ref('busLocations/' + localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  async stopRoute(){
    await this.presentLoading();

    try {
      this.deleteMarkers();
    } catch (error){
      console.log(error);
    } finally {
      this.loading.dismiss();
      this.router.navigate(['/motorista-menu']);
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Encerrando rota. Aguarde...' });
    return this.loading.present();
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};