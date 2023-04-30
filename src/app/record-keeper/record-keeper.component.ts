import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';

import { AttendanceService } from '../attendance.service';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-record-keeper',
  templateUrl: './record-keeper.component.html',
  styleUrls: ['./record-keeper.component.scss']
})
export class RecordKeeperComponent implements OnInit {

  database: any;
  recordRef: any;
  record: any = [];
  
  constructor(private attendanceService: AttendanceService) { 

    // Initialize Firebase
    const app = initializeApp(attendanceService.firebaseConfig);

    this.database = getDatabase(app);

    this.recordRef = ref(this.database, 'record');

    onValue(this.recordRef, (snapshot) => {
      // Listen to the record changes: Use the on() method to listen to changes
      // in the record state. When the record state changes, update the record on the client-side accordingly.
      console.log('snapshot: ', snapshot.val());
      // fires whenever a change occurs; update the record
      if (snapshot.val()) {
        this.record = snapshot.val();
      }
    });
  }

  addRecord() {
    const currentDate = new Date();
  
    // Check if there is an existing record
    const existingRecord = this.record.find((item: any) => item.id === this.recordRef.key);
  
    if (existingRecord) {
      // Update existing record with new date
      const existingRecordRef = ref(this.database, `record/${existingRecord.id}`);
      set(existingRecordRef, {
        ...existingRecord,
        date: currentDate,
      });
    } else {
      // Create new record with new date
      const newRecordRef = push(this.recordRef);
      set(newRecordRef, {
        id: newRecordRef.key,
        date: currentDate,
      });
    }
  }
  

  ngOnInit(): void {
  }

}
