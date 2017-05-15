import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {MyTicketsPage} from "../pages/my-tickets/my-tickets";
import {NewTicketPage} from "../pages/new-ticket/new-ticket";
import {ProfilePage} from "../pages/profile/profile";
import {RegisterPage} from "../pages/register/register";
import {HttpModule} from "@angular/http";
import {TicketdetailPage} from "../pages/ticketdetail/ticketdetail";
import { IonicStorageModule } from '@ionic/storage'
import {Camera} from "@ionic-native/camera";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
      LoginPage,
      MyTicketsPage,
      NewTicketPage,
      ProfilePage,
      RegisterPage,
      TicketdetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    MyTicketsPage,
    NewTicketPage,
    ProfilePage,
    RegisterPage,
      TicketdetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,

  ]
})
export class AppModule {}
