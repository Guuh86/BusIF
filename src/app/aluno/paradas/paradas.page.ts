import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.page.html',
  styleUrls: ['./paradas.page.scss'],
})
export class ParadasPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  private loading: any;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  lat: number;
  lng: number;

  constructor(
    public platform: Platform,
    private loadingCtrl: LoadingController,
    private actionSheetController: ActionSheetController,
    private geolocation: Geolocation,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.initMap();
    this.getPosition();
    this.presentAlert();
  }

  initMap() {
    const position = new google.maps.LatLng(-2.9304862, -41.8007037);

    const mapOptions = {
      zoom: 12,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Paradas regulares disponíveis:',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Rodoviária de Parnaíba',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9281762,-41.7533386),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'UFDPar',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9099275,-41.7538834),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Polícia Federal de Parnaíba',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9095349,-41.761102),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Igreja Matriz de São Sebastião',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.909003,-41.7724528),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'SENAI',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9084384,-41.7777323),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Funeral Prev',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9087103,-41.7800117),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Central de Flagrantes de Parnaíba',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9145573,-41.7801631),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'D LINK Lanches',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9168832,-41.7737774),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Auto Peças Parnaíba',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9176281,-41.7686881),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Bicipeças O Irmão',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9188041,-41.7661398),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Balão do Chico Berto',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9212183,-41.7627865),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      {
        text: 'Frangaria Todo Dia',
        icon: 'flag-outline',
        handler: () => {
          this.directionsService.route({
            origin: new google.maps.LatLng(this.lat, this.lng),
            destination: new google.maps.LatLng(-2.9292986,-41.7531963),
            travelMode: 'WALKING'
          }, (response, status) => {
            if (status === 'OK'){
              this.directionsDisplay.setDirections(response);
            } else {
              console.log(status);
            }
          });
        }
      },
      ]
    });
    await actionSheet.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Carregando conteúdo das paradas...' });
    return this.loading.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      subHeader: 'O porquê de poucas paradas disponíveis:',
      message: 'No momento estamos apenas mostrando as principais paradas e também as mais seguras para você! Em breve, iremos disponibilizar uma ferramenta oficial para você solicitar uma parada mais próxima, em casos de urgência solicite pela nossa aba de contato :)',
      buttons: ['OK']
    });

    await alert.present();
  }

  markersPosition = [
    { lat: -2.9281762, lng: -41.7533386 },
    { lat: -2.9099275, lng:  -41.7538834 },
    { lat: -2.9095349, lng: -41.761102 },
    { lat: -2.909003, lng: -41.7724528 },
    { lat: -2.9084384, lgn: -41.7777323 },
    { lat: -2.9087103, lng: -41.7800117 },
    { lat: -2.9145573, lng: -41.7801631 },
    { lat: -2.9168832, lng: -41.7737774 },
    { lat: -2.9176281, lng: -41.7686881 },
    { lat: -2.9188041, lng: -41.7661398 },
    { lat: -2.9212183, lng: -41.7627865 },
    { lat: -2.9292986, lng: -41.7531963 }
  ]

  presentMarkers(){
    for (let i = 0; i < this.markersPosition.length; i++){
      let marker = new google.maps.Marker({
        position: this.markersPosition[i],
        map: this.map,
        title: 'Parada Regular'
      })
    }
  }
 
}
