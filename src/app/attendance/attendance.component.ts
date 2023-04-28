import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AttendanceService } from '../attendance.service';

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

    this.attendanceService.getAttendance().subscribe((data: any[]) => {
      this.attendance = data;
    });
  }

  updateAttendance(id: string, value: any, name: string) {
    const updatedCalValue = {
      name: name,
      attendanceCal: value,
    }
    this.attendanceService.updateAttendance(id, updatedCalValue);
  }

  onSubmit() {
    if (this.attendanceForm?.invalid) {
      return;
    }

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
