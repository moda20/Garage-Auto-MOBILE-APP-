import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketdetailPage } from './ticketdetail';

@NgModule({
  declarations: [
    TicketdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketdetailPage),
  ],
  exports: [
    TicketdetailPage
  ]
})
export class TicketdetailPageModule {}
