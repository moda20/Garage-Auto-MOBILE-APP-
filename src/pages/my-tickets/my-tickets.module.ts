import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTicketsPage } from './my-tickets';

@NgModule({
  declarations: [
    MyTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTicketsPage),
  ],
  exports: [
    MyTicketsPage
  ]
})
export class MyTicketsPageModule {}
