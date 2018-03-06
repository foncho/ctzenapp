/* Angular */
import { Injectable, NgZone } from '@angular/core';

/* Geolocation */
import {
	Geolocation,
	Geoposition,
	BackgroundGeolocation,
} 														from 'ionic-native';

/* RXJS */
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {
	public watch: 		any;
	public latitude: 	number = 0;
	public longitude: number = 0;
	public config:		any;
	public options:		any;

  constructor(public zone: NgZone) {
		this.config = this.setBackgroundConfiguration();
		this.options = this.setOptions();		
		this.backgroundTracking(this.config);
	}
	
	startTracking() {
		console.log('startTracking');		
		BackgroundGeolocation.start();
		
		this.watch = Geolocation.watchPosition(this.options)
			.filter((p: any) => p.code === undefined)
			.subscribe((position: Geoposition) => {
				console.log(position);
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
		  });
	}

	stopTracking() {
		console.log('stopTracking');
		
		BackgroundGeolocation.finish();
		this.watch.unsubscribe();
	}
	
	getCurrentPosition() {
		return Geolocation.getCurrentPosition();
	}
	
	private setBackgroundConfiguration(
		desiredAccuracy = 0,
		stationaryRadius = 20,
		debug = false,
		distanceFilter = 10,
		stopOnTerminate = true, 
		startOnBoot = false,
		startForeground = true,
		interval = 1000,
		notificationTitle = "",
		notificationText = "",
		notificationIconColor = "#4CAF50",
		notificationIconLarge = "",
		notificationIconSmall = "",
		locationProvider = null,
		activityType = null,
		pauseLocationUpdates = true,
		url = null,
		syncUrl= null,
		syncThreshold = 100,
		httpHeaders = {},
		saveBatteryOnBackground = true,
		maxLocations = 10000
	) {
		return {
			desiredAccuracy: desiredAccuracy,
			stationaryRadius: stationaryRadius,
			debug: debug,
			distanceFilter: distanceFilter,
			stopOnTerminate: stopOnTerminate, 
			startOnBoot: startOnBoot,
			startForeground: startForeground,
			interval: interval,
			notificationTitle: notificationTitle,
			notificationText: notificationText,
			notificationIconColor: notificationIconColor,
			notificationIconLarge: notificationIconLarge,
			notificationIconSmall: notificationIconSmall,
			locationProvider: locationProvider,
			activityType: activityType,
			pauseLocationUpdates: pauseLocationUpdates,
			url: url,
			syncUrl: syncUrl,
			syncThreshold: syncThreshold,
			httpHeaders: httpHeaders,
			saveBatteryOnBackground: saveBatteryOnBackground,
			maxLocations: maxLocations
		};
	}
	
	private setOptions(maximumAge = 0, timeout = null, enableHighAccuracy = false) {
		return {
			maximumAge: maximumAge,
			timeout: timeout, 
			enableHighAccuracy: enableHighAccuracy
		};
	}
	
	private backgroundTracking(config) {
		BackgroundGeolocation.configure((location) => {
			this.zone.run(() => {
				this.latitude = location.latitude;
				this.longitude = location.longitude;
			});
		}, (error) => {
			console.log(error);
		}, config);
	}
}
