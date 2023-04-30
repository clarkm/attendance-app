import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';

import { AttendanceService } from '../attendance.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  attendanceForm: FormGroup;
  attendance: any[] | undefined;

  selected: Date | null | undefined;
  
  public modelCalendar: Date[] | undefined;


  constructor(
    private attendanceService: AttendanceService,
    private formBuilder: FormBuilder
  ) { 
    this.attendanceForm = this.formBuilder.group({
      name: ['', Validators.required],
      present: [false, Validators.required],
      absent: [false, Validators.required]
    });
  }

  ngOnInit() {

    this.attendanceService.getAttendance().pipe(
      map(data => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            console.log('element: ', element);
            if (element.attendanceCal) {
              element.attendanceCal = element.attendanceCal.map((dateString: string) => new Date(dateString));
            }
          }
        }
        return data;
      }),
      tap(res => {
        console.log('res: ', res);
      })
    ).subscribe((data: any[]) => {
      this.attendance = data;
    });
  }
  
  onDateChange(id: string, event: any) {
    const attendanceCal = { attendanceCal: event.value };
    this.attendanceService.saveAttendanceCal(id, attendanceCal).subscribe();
  }

  updateAttendance(id: string, value: any, name: string) {
    const updatedCalValue = {
      name: name,
      attendanceCal: value,
    }
    // this.attendanceService.updateAttendance(id, updatedCalValue);
  }

  saveAttendanceCal(key:string) {
    this.attendanceService.saveAttendanceCal(key, this.attendance);
  }

  onAttnChange(key: string) {
    console.count('onAttnChange');
    this.attendanceService?.saveAttendanceCal(key, this.attendance)
      .pipe(debounceTime(500))
      .subscribe(() => {
        console.log('Attendance data saved!');
      });
  }

  onSubmit() {
        const newAttendance = {
      name: this.attendanceForm?.controls?.['name'].value,
      // present: this.attendanceForm?.controls['present'].value,
      // absent: this.attendanceForm?.controls['absent'].value
      attendanceCal: []
    };

    this.attendanceService.addAttendance(newAttendance);
    this.attendanceForm?.reset();
  }


  deleteAttendance(id: string) {
    this.attendanceService.deleteAttendance(id);
  }

}
