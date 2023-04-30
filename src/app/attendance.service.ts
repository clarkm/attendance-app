import { Inject, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';

import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  firebaseConfig = {
        apiKey: "AIzaSyBfBSpOOBEw1Qa41AF1XIr4kzLl6HkVwRw",
        authDomain: "attendance-app-1fa5d.firebaseapp.com",
        databaseURL: "https://attendance-app-1fa5d-default-rtdb.firebaseio.com",
        projectId: "attendance-app-1fa5d",
        storageBucket: "attendance-app-1fa5d.appspot.com",
        messagingSenderId: "665760948794",
        appId: "1:665760948794:web:b0f07be638c8b7f5120b03"
      }
  database: any;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.database = getDatabase(app);
  }

  getAttendance(): Observable<any> {
    const attendanceRef = ref(this.database, 'attendance');
    return new Observable((observer) => {
      onValue(attendanceRef, (snapshot) => {
        const data = snapshot.val();
        observer.next(data);
      });
    });
  }

  addAttendance(attendance: any) {
    const attendanceRef = ref(this.database, 'attendance');
    return push(attendanceRef, attendance);
  }

  updateAttendance(id: string, value: any) {
    const attendanceRef = ref(this.database, 'attendance/' + id);
    return set(attendanceRef, value);
  }

  saveAttendanceCal(id: string, attendanceCal: any) {
    const attendanceRef = ref(this.database, `attendance/${id}`);
    const attn = attendanceCal[id]?.attendanceCal;
    return from(update(attendanceRef, { attendanceCal: attn }));
  }
  

  deleteAttendance(id: string) {
    const attendanceRef = ref(this.database, 'attendance/' + id);
    return remove(attendanceRef);
  }
}
