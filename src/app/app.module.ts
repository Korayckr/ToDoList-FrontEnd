import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ToDoFormComponent } from './Components/to-do-form/to-do-form.component';
import { ToDoPageComponent } from './to-do-page/to-do-page.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { AllUserPageComponent } from './all-user-page/all-user-page.component';
import { AllUserComponent } from './Components/all-user/all-user.component';













@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToDoFormComponent,
    ToDoPageComponent,
    LoginComponent,
    AllUserPageComponent,
    AllUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    MenuModule,
    HttpClientModule,
    BrowserAnimationsModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
