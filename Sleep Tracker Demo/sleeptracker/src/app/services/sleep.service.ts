import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

//import { AngularFireDatabase } from '@angular/fire/database';
//import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore'; 
//import { Observable } from 'rxjs/Observable';

import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  private static LoadDefaultData:boolean = true;
  public static AllSleepData:SleepData[] = [];
  public static AllOvernightData:OvernightSleepData[] = [];
  public static AllSleepinessData:StanfordSleepinessData[] = [];
  public static idList = [];
  
  //public static AllSleepData:Observable<SleepData[]>;
  //public static fireDB:AngularFireDatabase;
  //public static collection:AngularFirestoreCollection;

  constructor(public fbService: FirebaseService) {
    if(SleepService.LoadDefaultData) {
      //this.addDefaultData();
      SleepService.LoadDefaultData = false;
    }
    //SleepService.collection = db.collection('test-collection');
    //fbService.addSleepLog(new OvernightSleepData(new Date('November 12, 2018 01:03:00'), new Date('November 12, 2018 09:25:00')));
    //console.log(new OvernightSleepData(new Date('November 12, 2018 01:03:00'), new Date('November 12, 2018 09:25:00')).hasOwnProperty('sleepStart'));
    console.log(this.fbService.collection);
    //console.log(fbService.getSleepLogs());
    this.parseFirebaseData();
    
  }

  private addDefaultData() {
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 01:03:00'), new Date('November 12, 2018 09:25:00')));
    this.logSleepinessData(new StanfordSleepinessData(4, new Date('November 12, 2018 14:38:00')));
    this.logOvernightData(new OvernightSleepData(new Date('November 12, 2018 23:11:00'), new Date('November 13, 2018 08:03:00')));
  }

  public logOvernightData(sleepData:OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
  }

  public logSleepinessData(sleepData:StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
  }
  
  public updateIdList(dataID:string){
    SleepService.idList.push(dataID);
  }

  private parseFirebaseData() {

    this.fbService.getSleepLogs().subscribe(data=>{
        SleepService.idList = [];

        var tempArray = [];
        data.forEach(doc => {
          tempArray.push(doc);
        });

        SleepService.AllSleepData = [];
        
        for (var index in tempArray){
          //console.log(tempArray[index]);
          this.updateIdList(tempArray[index]['id']);

          if (tempArray[index].hasOwnProperty("sleepStart")||(tempArray[index].hasOwnProperty("sleepEnd"))){
            //console.log(tempArray[index]["sleepStart"]);
            var parsedStartSum = new Date(tempArray[index]["sleepStart"]["nanoseconds"]/1000000+tempArray[index]["sleepStart"]["seconds"]*1000);
            var parsedEndSum = new Date(tempArray[index]["sleepEnd"]["nanoseconds"]/1000000+tempArray[index]["sleepEnd"]["seconds"]*1000);
            console.log(parsedStartSum);
            console.log(parsedEndSum);

            var newLog1 =  new OvernightSleepData(parsedStartSum, parsedEndSum);
            newLog1.id = tempArray[index]['id'];

            this.logOvernightData(newLog1);
          }
          else if (tempArray[index].hasOwnProperty("loggedValue")){
            //console.log(tempArray[index]["loggedValue"]);
            var parsedDateTime = new Date(tempArray[index]["loggedAt"]["nanoseconds"]/1000000+tempArray[index]["loggedAt"]["seconds"]*1000);

            var newLog2 = new StanfordSleepinessData(tempArray[index]["loggedValue"], parsedDateTime);
            newLog2.id = tempArray[index]['id'];

            this.logSleepinessData(newLog2);
          }
        }
      });
    }

  public clearDB() {
    SleepService.AllSleepData = [];

    for (var index in SleepService.idList){
      var deleteDoc = this.fbService.collection.doc(SleepService.idList[index]).delete();
    }

    SleepService.idList = [];
    
  }

  public clearDataEntry(docID: string){
    var deleteDoc = this.fbService.collection.doc(docID).delete();
  }

  
}
