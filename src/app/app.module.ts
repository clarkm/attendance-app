import 'firebase/database';

import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceService } from './attendance.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent, AttendanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireDatabaseModule,
   ReactiveFormsModule,
   MatDatepickerModule,
   MatInputModule, 
   MatNativeDateModule,
   MatCardModule,
   
   HttpClientModule,
  ],
  providers: [
    AttendanceService,
    AngularFireDatabase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
