import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { SleepData } from '../data/sleep-data';
import { Observable } from 'rxjs';
//import { SleepService } from '../services/sleep.service';

import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collection:AngularFirestoreCollection;
  public logIdArray:string[];

  constructor(db:AngularFirestore) {
    this.collection = db.collection('a5-sleeptracker');
    this.collection.valueChanges().subscribe((data)=>{
      console.log(data);
    });
    this.logIdArray = [];
  }

  public addNewId(id:string){
    this.logIdArray.push(id);
  }

  addSleepLog(sleepLog:SleepData) {
  	//TODO: implement this function to add sleep logs
  }

  addOvernightLog(sleepLog:OvernightSleepData){
    var newData = {
      category: "Overnight",
      start: sleepLog.sleepStart,
      end: sleepLog.sleepEnd,
      logId: sleepLog.id,
      logTime: sleepLog.loggedAt
    }

    var setDoc = this.collection.doc(sleepLog.id).set(newData);
  }

  addSleepyLog(sleepLog:StanfordSleepinessData){
    var newData = {
      category: "Stanford",
      sleepiness: sleepLog.loggedValue,
      logId: sleepLog.id, 
      logTime: sleepLog.loggedAt
    }

    var setDoc = this.collection.doc(sleepLog.id).set(newData);
  }

  getSleepLogs():Observable<DocumentData[]> {
  	//TODO: implement this function to retrieve sleep logs
    var tempObs = this.collection.valueChanges();
    return tempObs;
  }

  public resetFirebase(){
    for (var item in this.logIdArray){
      var deleteDoc = this.collection.doc(this.logIdArray[item]).delete();
    }

    this.logIdArray = [];
  }

}
