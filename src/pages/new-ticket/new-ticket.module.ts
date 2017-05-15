import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTicketPage } from './new-ticket';
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    NewTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTicketPage),
  ],
  exports: [
    NewTicketPage
  ],
  providers: [
    Camera
  ]
})
export class NewTicketPageModule {}
