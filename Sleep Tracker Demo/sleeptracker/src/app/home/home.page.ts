import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { FirebaseService } from '../services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
		private sleepStart:Date;
		private sleepEnd:Date;
		private inputSleepStart:Date;
		private inputSleepEnd:Date;
		private sleepiness:number;
		private inputSleepyTime:Date;
		private sleepyTime:Date;
		private dataArrayFilled:boolean;

	constructor(public sleepService:SleepService, public fbSerivce:FirebaseService, public alertController: AlertController) {
	}

	ngOnInit() {
		//console.log(this.allSleepData);
		//this.addOvernightData([new Date('November 25, 2018 05:03:00'), new Date('November 25, 2018 12:25:00')]);
		console.log(this.allSleepData);
		this.sleepStart = new Date();
		this.sleepEnd = new Date();
		this.inputSleepStart = new Date();
		this.inputSleepEnd = new Date();
		this.sleepiness = 1;
		this.inputSleepyTime = new Date();
		this.sleepyTime = new Date();
		this.dataArrayFilled = true;
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	addOvernightData(dateArray: Date[]){
		this.sleepService.logOvernightData(new OvernightSleepData(dateArray[0], dateArray[1]));
	}

	sleepStartChanged(){
		this.sleepStart = new Date(this.inputSleepStart);
		console.log(this.sleepStart);
	}

	sleepEndChanged(){
		this.sleepEnd = new Date(this.inputSleepEnd);
		console.log(this.sleepEnd);
	}

	addNewSleepTime(){
		//this.sleepService.logOvernightData(new OvernightSleepData(this.sleepStart, this.sleepEnd));
		this.fbSerivce.addSleepLog(new OvernightSleepData(this.sleepStart, this.sleepEnd));
		console.log(this.allSleepData);
		//var tempstr = this.allSleepData[0].dateString();
		//console.log(tempstr);
	}
	sleepyTimeChanged(){
		//console.log(this.inputSleepyTime);
		this.sleepyTime = new Date(this.inputSleepyTime);
		console.log(this.sleepyTime);
	}
	sleepinessChanged(){
		console.log(this.sleepiness);
	}

	addNewSleepiness(){
		//this.sleepService.logSleepinessData(new StanfordSleepinessData(this.sleepiness, this.sleepyTime));
		this.fbSerivce.addSleepLog(new StanfordSleepinessData(this.sleepiness, this.sleepyTime));
		console.log(this.allSleepData);
	}

	clearData(){
		this.sleepService.clearDB();
	}

	clearSingleLog(docID: string){
		console.log(docID);
		this.sleepService.clearDataEntry(docID);
	}

	async presentAlert(){
		const alert = await this.alertController.create({
			header: 'Confirm to Proceed?',
			message: 'You are going to delete <strong>all</strong> current logs.',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log("Deletion cancelled");
					}
				}, {
					text: 'Delete',
					handler: () => {
						this.clearData();
					}
				}
			]
		});

		await alert.present();
	}

	async singleDeleteAlert(docID: string){
		const alert = await this.alertController.create({
			header: 'Delete this log?',
			message: 'You are going to <strong>delete</strong> this log.',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log("Deletion cancelled");
					}
				}, {
					text: 'Delete',
					handler: () => {
						this.clearSingleLog(id);
					}
				}
			]
		});

		var id = docID;
		await alert.present();
	}
}
