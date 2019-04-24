import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { SleepData } from '../data/sleep-data';
import { Observable } from 'rxjs';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public collection:AngularFirestoreCollection;
  public items: Observable<any[]>;

  constructor(db:AngularFirestore) {
    //this.collection = db.collection('a5-sleeptracker');
    this.collection = db.collection('test_collection');
    db.collection('test_collection').valueChanges().subscribe((data)=>{
      console.log(data);
    });
  }

  addSleepLog(sleepLog:SleepData) {
    //TODO: implement this function to add sleep logs
    var data = {};
    console.log(sleepLog);
    if (sleepLog.hasOwnProperty("sleepStart") || sleepLog.hasOwnProperty("sleepEnd")){
      console.log("overnight");
      var tempObj1 = <OvernightSleepData>sleepLog;
      data = {
        id: tempObj1.id,
        loggedAt: tempObj1.loggedAt,
        sleepStart: tempObj1.getSleepStart(), 
        sleepEnd: tempObj1.getSleepEnd()
      };
    }
    else if (sleepLog.hasOwnProperty("loggedValue")){
      console.log("stanford sleepy");
      var tempObj2 = <StanfordSleepinessData>sleepLog;
      data = {
        id: tempObj2.id,
        loggedAt: tempObj2.loggedAt, 
        loggedValue: tempObj2.getLoggedValue()
      };
    }
    var setDoc = this.collection.doc(data['id']).set(data);
  }

  getSleepLogs():Observable<DocumentData[]> {
  	//TODO: implement this function to retrieve sleep logs
    return this.collection.valueChanges();
  }
}
