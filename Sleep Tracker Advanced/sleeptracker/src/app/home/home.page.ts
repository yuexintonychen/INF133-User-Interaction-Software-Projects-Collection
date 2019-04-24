import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { FirebaseService } from '../services/firebase.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	private overnightSleepInput: Date;
	private overnightSleepParsed: Date;
	private overnightWakeInput: Date;
	private overnightWakeParsed: Date;
	private stanfordMeasure: number;
	private stanfordDateInput: Date;
	private stanfordDateParsed: Date;
	private showLog: boolean;

	constructor(public alertController: AlertController, public sleepService:SleepService, public firebase: FirebaseService) {
		this.overnightSleepInput = new Date();
		this.overnightSleepParsed = new Date();
		this.overnightWakeInput = new Date();
		this.overnightWakeParsed = new Date();
		this.stanfordMeasure = 7;
		this.stanfordDateInput = new Date();
		this.stanfordDateParsed = new Date();
		this.showLog = false;
	}

	ngOnInit() {
		console.log(this.allSleepData);
		//console.log(this.overnightDateInput);
		//console.log(this.overnightDateParsed);
	}

	public resetLog(){
		this.sleepService.resetAllSleepData();
	}

	async confirmReset(){
		const alert = await this.alertController.create({
			header: 'Reset Log?',
			message: '<strong>All</strong> your logs will be deleted!',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
					}
				}, {
					text: 'Okay',
					handler: () => {
						this.resetLog();
					}
				}
			]
		});

		await alert.present();
	}

	overnightSleepMod(){
		this.overnightSleepParsed = new Date(this.overnightSleepInput);
		
		console.log(this.overnightSleepInput);
		console.log(this.overnightSleepParsed);
	}

	overnightWakeMod(){
		this.overnightWakeParsed = new Date(this.overnightWakeInput);
		
		console.log(this.overnightWakeInput);
		console.log(this.overnightWakeParsed);
	}

	stanfordDateMod(){
		this.stanfordDateParsed = new Date(this.stanfordDateInput);

		console.log(this.stanfordDateInput);
		console.log(this.stanfordDateParsed);
	}
	
	stanfordMeasureMod(){
		console.log(this.stanfordMeasure);
	}

	logOvernightSleep(){
		var newLog = new OvernightSleepData(this.overnightSleepParsed, this.overnightWakeParsed);
		//this.sleepService.logOvernightData(newLog);
		this.firebase.addOvernightLog(newLog);

		console.log(this.allSleepData);
	}

	logStanfordSleepiness(){
		var newLog = new StanfordSleepinessData(this.stanfordMeasure, this.stanfordDateParsed);
		//this.sleepService.logSleepinessData(newLog);
		this.firebase.addSleepyLog(newLog);

		console.log(this.allSleepData);
	}

	changeShowStatus(){
		if (this.showLog){
			this.showLog = false;
		}
		else{
			this.showLog = true;
		}
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
	
}
