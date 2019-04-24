import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

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

	constructor(public sleepService:SleepService) {
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
		this.dataArrayFilled = false;
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
		this.sleepService.logOvernightData(new OvernightSleepData(this.sleepStart, this.sleepEnd));
		this.dataArrayFilled = true;
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
		this.sleepService.logSleepinessData(new StanfordSleepinessData(this.sleepiness, this.sleepyTime));
		this.dataArrayFilled = true;
		console.log(this.allSleepData);
	}
}
