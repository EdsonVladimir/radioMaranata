import {Component, OnChanges, OnInit} from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnChanges {

  constructor( public router: Router, public network: Network) {
      this.conectado();
  }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['home']);
        }, 6000);
    }
    ngOnChanges(){


// stop disconnect watch


// watch network for a connection

    }
    conectado(){
        this.network.onConnect().subscribe(() => {
            console.log('conectado a internet!');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(() => {
                if (this.network.type === 'wifi') {
                    console.log('we got a wifi connection, woohoo!');
                    this.router.navigate(['home']);
                }
            }, 3000);
        });
    }
   noConectado(){
       this.network.onDisconnect().subscribe((res) => {
           console.log('No hay conexion a internet :-(');
           console.log(res);
       });
   }


}
