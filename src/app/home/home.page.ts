import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface OutputData {
  id: number;
  value: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userDoc: OutputData;
  constructor(private fireStore: AngularFirestore) {
    this.userDoc = {id: 0, value: ""};
    this.fireStore.collection<OutputData>('output').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => 
          {
            const d = a.payload.doc.data();
            return d;
          }
        )
      )
    ).subscribe(arr => {
      var mid = 0;
      arr.forEach(element => {
        if(element.id > mid){
          mid = element.id;
          this.userDoc = element;
        }
      });
    });
  }
}
