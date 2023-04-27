import 'firebase/database';

import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceService } from './attendance.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, AttendanceComponent
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
   ReactiveFormsModule 
  ],
  providers: [
    AttendanceService,
    AngularFireDatabase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
