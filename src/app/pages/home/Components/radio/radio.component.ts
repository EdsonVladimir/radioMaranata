import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import {NavController, PickerController} from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import {Router} from '@angular/router';
import { ILocalNotificationActionType } from '@ionic-native/local-notifications/ngx';
import instantiateStreaming = WebAssembly.instantiateStreaming;
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
  file: any;
  url: string;
  stream: any;
  promise: any;
  defaultColumnOptions = [
    [
      '10 m',
      '30 m',
      '60 m',
      '90 m',
      '120 m'
]
  ];
  // @ts-ignore
  option: StreamingAudioOptions = {
    initFullscreen: false, // true is default. iOS only.
    keepAwake: false,
    controls: false,
    bgImage: '../../../../assets/img/fondo_02.png',
    orientation: 'portrait|landscape',
    shouldAutoClose: false,
    successCallback: () => { console.log('Video played'); },
    errorCallback: (e) => { console.log('Error streaming'); }
  };
  // file = new Audio('http://159.65.43.68:8006/;');

  constructor(
                private nativeAudio: NativeAudio,
                private pickerCtrl: PickerController,
                private streamingMedia: StreamingMedia,
                private localNotifications: LocalNotifications
              ) {
    // tslint:disable-next-line:label-position
    this.url = 'http://159.65.43.68:8006/;';
    this.stream = new Audio(this.url);

  }
  play() {
    this.stream.play();
    this.promise = new Promise((resolve, reject) => {
      this.stream.addEventListener('playing', () => {
        this.buttonplay = false;
        resolve(true);
      });
      this.stream.addEventListener('waiting', () => {
        this.buttonplay = false;
        resolve(true);
      });
      this.stream.addEventListener('error', () => {
        this.buttonplay = true;
        reject(false);
      });
    });
    return this.promise;
  };
  pause() {
    this.buttonplay = true;
    this.stream.pause();
  };
  ngOnInit() {

  }

  startAudio() {
    if (this.buttonplay) {
        this.play().play().then(() => {
        console.log('Playing');
      });
    } else {
      this.pause();
      console.log('Pause');
    }
  }
    // this.streamingMedia.playAudio('http://159.65.43.68:8006/;', this.option);
    /*this.file.autoplay = true;
    this.file.preload = 'auto';
    if (this.buttonplay){
      this.file.play();
      this.buttonplay = false;
    } else {
      this.file.pause();
      this.file.addEventListener('pause', () => {
        this.buttonPlay = true;
      });
      this.buttonplay = true;
    }
  }*/
  muteAudio(){
    if (this.buttonmute){
      this.stream.muted = true;
      this.buttonmute = false;
    } else {
      this.stream.muted = false;
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
                this.stream.pause();
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
 /* simpleNotif() {
    this.localNotifications.schedule({

      id: 1,
      led: '282828',
      sound: null,
      title: 'Maranatha',
      data: { button: 'OK' },
      lockscreen: true,
      sticky: true,
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ]
    });
  }*/
}
