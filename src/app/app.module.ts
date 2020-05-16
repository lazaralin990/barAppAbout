import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AuthGuard } from './auth.guard';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabase } from 'angularfire2/database';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartasComponent } from './components/cartas/cartas.component';
import { HeaderComponent } from './components/header/header.component';
import { EstablecimientoComponent } from './components/establecimiento/establecimiento.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthService } from './service/auth.service';


import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ManagementComponent } from './components/management/management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { PopUpModule } from './components/pop-up-component-cat/pop-up-component-cat.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewCartaComponent } from './components/view-carta/view-carta.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartasComponent,
    HeaderComponent,
    EstablecimientoComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ManagementComponent,
    UserManagementComponent,
    ConfirmEmailComponent,
    MyDashboardComponent,
    EditProfileComponent,
    ViewCartaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    PopUpModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AngularFireDatabase
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
