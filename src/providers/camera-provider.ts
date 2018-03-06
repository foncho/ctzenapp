/* Angular */
import { Injectable } from '@angular/core';

/* Geolocation */
import { Camera } from 'ionic-native';

/* RXJS */
import 'rxjs/add/operator/filter';

@Injectable()
export class CameraProvider {
	public image: 		any;

  constructor() {}
	
	takePicture() {
		Camera.getPicture({
			destinationType: Camera.DestinationType.DATA_URL,
			quality: 100
		}).then((result) => {
			this.image = "data:image/jpeg;base64," + result;
		}).catch((error) => {
			console.error(error);
		});
	}
}