import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

//If a plugin is not implemented with Ionic Native, it may use this cordova variable.
declare var cordova;

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  constructor(private platform: Platform, private deviceMotion:DeviceMotion) {
  	this.platform.ready().then(() => {
  		if(this.platform.is('cordova')) {
  			//TODO: use whatever native library you want! The code does not need to be in the constructor.
  			//It can be added to a new method instead, but preserve the platform.ready() and this.platform.is(cordova) checks.
  		}
  	});
  }
}
