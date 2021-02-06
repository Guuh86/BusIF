import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }

  facebookBrowser(){
    this.iab.create('https://fb.com/Guh86/');
  }

  instagramBrowser(){
    this.iab.create('https://instagram.com/_guuh86');
  }

  twitterBrowser(){
    this.iab.create('https://twitter.com/_Guuh86');
  }

}
