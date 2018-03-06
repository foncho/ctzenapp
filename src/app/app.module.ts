/* Angular */
import { NgModule } 							from '@angular/core';
import { IonicApp, IonicModule } 	from 'ionic-angular';

/* Components */
import { App } 										from './app.component';

/* Pages (models) */
import { HomePage } 							from '../pages/home/home';
import { TabsPage } 							from '../pages/tabs/tabs';

/* Providers */
import { LocationTracker } 				from '../providers/location-tracker';
import { CameraProvider } 				from '../providers/camera-provider';

@NgModule({
  declarations: [
    App,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    HomePage,
    TabsPage
  ],
  providers: [
		LocationTracker,
		CameraProvider
	]
})

export class AppModule {}
