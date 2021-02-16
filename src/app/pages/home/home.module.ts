import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {RadioComponent} from './Components/radio/radio.component';
import {PredicasComponent} from './Components/predicas/predicas.component';
import {EnvivoComponent} from './Components/envivo/envivo.component';
import {UbicacionesComponent} from './Components/ubicaciones/ubicaciones.component';
import {CountdownModule} from 'ngx-countdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        CountdownModule
    ],
  declarations: [
      HomePage,
      RadioComponent,
      PredicasComponent,
      EnvivoComponent,
      UbicacionesComponent
  ]
})
export class HomePageModule {}
