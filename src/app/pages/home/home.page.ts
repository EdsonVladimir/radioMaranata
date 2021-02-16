import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  botonRadio = true;
  botonPredicas = false;
  botonEnvivo = false;
  botonUbicaciones = false;
  clickSub: any;
  constructor( public router: Router) { }

  ngOnInit() {
  }
  radioEvent(){
    this.botonRadio = true;
    this.botonPredicas = false;
    this.botonEnvivo = false;
    this.botonUbicaciones = false;
    this.router.navigate(['home/radio']);
  }
  predicasEvent(){
    this.botonPredicas = true;
    this.botonRadio = false;
    this.botonEnvivo = false;
    this.botonUbicaciones = false;
    this.router.navigate(['home/predicas']);
  }
  envivoEvent(){
    this.botonEnvivo = true;
    this.botonRadio = false;
    this.botonPredicas = false;
    this.botonUbicaciones = false;
    this.router.navigate(['home/envivo']);
  }
  ubicacionEvent(){
    this.botonUbicaciones = true;
    this.botonRadio = false;
    this.botonPredicas = false;
    this.botonEnvivo = false;
    this.router.navigate(['home/ubicaciones']);
  }
}
