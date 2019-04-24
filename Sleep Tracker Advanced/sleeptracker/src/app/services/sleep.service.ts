import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadDefaultData:boolean = true;
  public static AllSleepData:SleepData[] = [];
  public static AllOvernightData:OvernightSleepData[] = [];
  public static AllSleepinessData:StanfordSleepinessData[] = [];

  constructor(public firebase:FirebaseService) {
    if(SleepService.LoadDefaultData) {
      //this.addDefaultData();
      SleepService.LoadDefaultData = false;
      
    }
    this.getfbData();
  }

  private addDefaultData() {
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 01:03:00'), new Date('November 12, 2018 09:25:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('November 12, 2018 14:38:00')));
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 23:11:00'), new Date('November 13, 2018 08:03:00')));
  }

  public getfbData(){
    this.firebase.getSleepLogs().subscribe(res=>{
      SleepService.AllSleepData = [];
      this.firebase.logIdArray = [];

      for (var item in res){
        
        this.firebase.addNewId(res[item]['logId']);
        if (res[item].hasOwnProperty('category')){
          if (res[item]['category'] == 'Overnight'){
            var startDate = new Date(res[item]['start']['seconds']*1000+
            res[item]['start']['nanoseconds']/1000000);
            var endDate = new Date(res[item]['end']['seconds']*1000+
            res[item]['end']['nanoseconds']/1000000);
            this.logOvernightData(new OvernightSleepData(startDate, endDate));
          }
          else if (res[item]['category'] == 'Stanford'){
            var logDate = new Date(res[item]['logTime']['seconds']*1000+
            res[item]['logTime']['nanoseconds']/1000000);
            this.logSleepinessData(new StanfordSleepinessData(
              res[item]['sleepiness'], logDate
            ));
          }
        }

      }

      console.log(this.firebase.logIdArray);
    });
  }

  public resetAllSleepData(){
    SleepService.AllSleepData = [];
    this.firebase.resetFirebase();
  }

  public logOvernightData(sleepData:OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    //SleepService.AllOvernightData.push(sleepData);
  }

  public logSleepinessData(sleepData:StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    //SleepService.AllSleepinessData.push(sleepData);
  }
}
