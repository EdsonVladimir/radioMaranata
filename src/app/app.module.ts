import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CountdownModule } from 'ngx-countdown';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Network } from '@ionic-native/network/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { Media } from '@ionic-native/media/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            CountdownModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StreamingMedia,
      LocalNotifications,
      Media
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
