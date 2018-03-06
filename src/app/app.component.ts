import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})

export class App {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready()
			.then(() => {
      	StatusBar.styleDefault();
      	Splashscreen.hide();
    	});
  }
}
