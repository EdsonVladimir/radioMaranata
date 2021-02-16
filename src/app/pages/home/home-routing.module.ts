import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {RadioComponent} from './Components/radio/radio.component';
import {EnvivoComponent} from './Components/envivo/envivo.component';
import {PredicasComponent} from './Components/predicas/predicas.component';
import {UbicacionesComponent} from './Components/ubicaciones/ubicaciones.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'radio', pathMatch: 'full' },
      {
        path: 'radio',
        component: RadioComponent
      },
      {
        path: 'predicas',
        component: PredicasComponent
      },
      {
        path: 'envivo',
        component: EnvivoComponent
      },
      {
        path: 'ubicaciones',
        component: UbicacionesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
