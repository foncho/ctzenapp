/* Angular */
import { Component, ViewChild, ElementRef } from '@angular/core';

/* Controllers */
import { NavController, AlertController, Platform } from 'ionic-angular';

/* Native */
import { Geolocation, Network, Diagnostic } from 'ionic-native';


/* Providers */
import { LocationTracker } from '../../providers/location-tracker';
import { CameraProvider } from '../../providers/camera-provider';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;	
	public image: string;
	
  constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public locationTracker: LocationTracker,
		public cameraProvider: CameraProvider,
		private platform: Platform
	) {
		this.platform.ready()
			.then(() => {
				if (this.noConnection()) {
					this.showSettings();
				}
			})
			.catch((error) => {
			})
	}
	
	ionViewWillEnter() {
		this.loadMap();
	}
	
	loadMap() {
		console.log(this.locationTracker.getCurrentPosition());
		this.locationTracker
			.getCurrentPosition()
			.then((result) => {
				let latLng = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
				let mapOptions = {
					center: latLng,
					zoom: 18,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
		
				this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			
				let marker = new google.maps.Marker({
					map: this.map,
					animation: google.maps.Animation.DROP,
					position: this.map.getCenter()
				});
			
				google.maps.event.addListener(marker, 'click', () => {});
			}, (error) => {
				console.error(error);
			});
	}
		
	startGeolocation() {
		this.locationTracker.startTracking();
	}
	
	stopGeolocation() {
		this.locationTracker.stopTracking();
	}
	
	takePicture() {
		this.locationTracker.getCurrentPosition();
		this.cameraProvider.takePicture();
	}
	
	reportIncident() {
		let alert = this.alertCtrl.create({
			title: 'Thanks!',
			subTitle: 'Incident succesfully reported.',
			buttons: ['Dismiss']
		});
			
		alert.present();
	}
	
	noConnection() {
    return (Network.connection === 'none');
  }


  private showSettings() {
    if (Diagnostic.switchToWifiSettings) {
      Diagnostic.switchToWifiSettings();
    } else {
      Diagnostic.switchToSettings();
    }
  }
}
