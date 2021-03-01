import { Component, OnInit } from '@angular/core';
import {NavController, PickerController} from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Observable } from 'rxjs'
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  minlocal: number;
  horaInt: number;
  minInt: number;
  segLocalTotal: number;
  segIntTotal: number;
  totalTotal: number;
  buttonplay = true;
  buttonmute = true;
  horamin = true;
  tiempo: any = {};
  tiempoMostrar: number;
  timer = true;
  varTime: any;
  buttonPlay = true;
  navCtrl: any;
  spinerTrue = false;
  stream: MediaObject;
  url: string;
  promise: any;
  resultado: any;
  errorCode:any = {};
  defaultColumnOptions = [
    [
      '10 m',
      '30 m',
      '60 m',
      '90 m',
      '120 m'
]
  ];

  constructor(
                private pickerCtrl: PickerController,
                private media: Media,
                public toastController: ToastController,
                public network: Network
              ) {
  }

  ngOnInit() {
    this.network.onConnect().subscribe(() => 
      //this.spinerTrue = false
      console.log('conectado a internet')
);

  this.network.onDisconnect().subscribe((res) => 
    //  console.log('No hay conexion a internet :-(');
      //console.log(res);
      this.presentToast('No hay conexion a internet', 'danger', 3000)
  )
  }
  ngAfterViewInit():void {

  }
  spinertrue(){
    this.spinerTrue = true;
  }
  spinerfalse(){
    this.spinerTrue = false;
  }
  startAudio() {
    //console.log("hola munfo");
    if (this.buttonplay) {
      this.stream = this.media.create('http://159.65.43.68:8006/;');
      this.stream.onStatusUpdate.subscribe(status => {
        this.resultado = status;
        if(this.resultado === 1){
          this.presentToast('Conectando', 'primary', 3000)
        }
        if(this.resultado === 2){
          this.presentToast('Conectado', 'success', 2000)
        }
      });
     
      //this.stream.onSuccess.subscribe(() => this.presentToast('todo bien', 'succes'));
      this.stream.onError.subscribe(error => {
        this.errorCode =error;
        if(this.errorCode.code === 0){
          this.presentToast('Intente de nuevo', 'danger', 2000)
        }
        if(this.errorCode.code === 2){
          this.presentToast('Error de Red', 'danger', 2000)
        }
      }
        );

      this.stream.play();
      this.spinerTrue = false;
      this.buttonplay = false;
      this.buttonPlay = false;
    } else {
      this.stream.stop();
     this.stream.release();
      this.buttonplay = true;
      this.buttonPlay = true;
    }
  }
  muteAudio(){
    if (this.buttonmute){
      this.stream.setVolume(0.0);
      this.buttonmute = false;
    } else {
      this.stream.setVolume(1.0);
      this.buttonmute = true;
    }
  }
  async openPicker(){
    const numColumns = 1;
    const numOptions = 5;
    const columnOptions = this.defaultColumnOptions;
    const picker = await this.pickerCtrl.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Atras',
          role: 'cancel'
        },
        {
          text: 'Apagar',
          handler: (value) => {
            switch (value.col.value) {
            case 0: {
              this.minInt = 10;
              break;
              }
            case 1: {
              this.minInt = 30;
              break;
              }
              case 2: {
                this.minInt = 60;
                break;
              }
              case 3: {
                this.minInt = 90;
                break;
              }
              case 4: {
                this.minInt = 120;
                break;
              }
            }
            this.segIntTotal = this.minInt * 60 * 1000;
            if (this.segIntTotal > 0){
                clearTimeout(this.varTime);
                this.timer = false;
                this.varTime = setTimeout( () => {
                this.stream.stop();
                this.stream.release();
                this.tiempoMostrar = 0;
                this.segIntTotal = 0;
                this.timer = true;
                this.buttonplay = true;
              }, this.segIntTotal);
                this.tiempoMostrar = this.minInt * 60;
                this.tiempo =
                {leftTime: this.tiempoMostrar};
            }
          }
        }, {
        text: 'cancelar',
          handler: (value) => {
            clearTimeout(this.varTime);
            this.tiempoMostrar = 0;
            this.segIntTotal = 0;
            this.timer = true;
          }
        }
      ]
    });
    await picker.present();
  }
  getColumns(numColumns, numOptions, columnOptions) {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }
  getColumnOptions(columnIndex, numOptions, columnOptions) {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }
    return options;
  }
  async presentToast(mensage:any, bgcolor:any, time:number) {
    const toast = await this.toastController.create({
      message: mensage,
      position:"middle",
      duration: time,
      color: bgcolor
    });
    toast.present();
  }
 
}
