import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
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
  isTracking = false;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private device: Device,
    private loadingCtrl: LoadingController
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
          let image = 'assets/imgs/blue-bike.png';
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

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  initMap() {
    const position = new google.maps.LatLng(-2.9304862, -41.8007037);

    const mapOptions = {
      zoom: 16,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({suppressMarkers: true});
  }

  async morningRoute(){
    await this.presentLoading();
    try {
      this.directionsService.route({
        origin: new google.maps.LatLng(-2.9476372, -41.731816),
        destination: new google.maps.LatLng(-2.9471243, -41.7325108),
        waypoints: [
          { location: '-2.9280857, -41.7535305' },
          { location: '-2.918631,-41.7538021' },
          { location: '-2.9104843,-41.7536163' },
          { location: '-2.9095623,-41.7541675' },
          { location: '-2.9092732,-41.7597013' },
          { location: '-2.908802,-41.7725397' },
          { location: '-2.9083968,-41.7783028' },
          { location: '-2.9084561,-41.7800984' },
          { location: '-2.914414,-41.7804418' },
          { location: '-2.916791,-41.7718795' },
          { location: '-2.9178817,-41.7685078' },
          { location: '-2.9184596,-41.7672336' },
        ],
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status == 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          console.log('Ocorreu um erro ao obter direções!' + status);
        }
      });
      this.isTracking = true;
    } catch(error){
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async nightRoute(){
    await this.presentLoading();

    try {
      this.directionsService.route({
        origin: new google.maps.LatLng(-2.9476372, -41.731816),
        destination: new google.maps.LatLng(-2.9471243, -41.7325108),
        waypoints: [
          { location: '-2.9206203,-41.7298345' },
          { location: '-2.9201517,-41.7343433' },
          { location: '-2.919146,-41.754001' },
          { location: '-2.9104843,-41.7536163' },
          { location: '-2.9095623,-41.7541675' },
          { location: '-2.9092732,-41.7597013' },
          { location: '-2.9083968,-41.7783028' },
          { location: '-2.9084561,-41.7800984' },
          { location: '-2.914414,-41.7804418' },
          { location: '-2.916791,-41.7718795' },
          { location: '-2.9185955,-41.7667086' }
        ],
        travelMode: 'DRIVING'
      },
        (response, status) => {
          if (status == 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            console.log('Ocorreu um erro ao obter direções!' + status);
          }
        });
      this.isTracking = false;
    } catch (error){
      console.log(error);
    } finally {
      this.loading.dismiss();
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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Carregando conteúdo da rota...' });
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