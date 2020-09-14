import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { InputDataComponent } from './input-data/input-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameDataComponent } from './name-data/name-data.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { TaskCompComponent } from './task-comp/task-comp.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    InputDataComponent,
    NameDataComponent,
    TaskCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
