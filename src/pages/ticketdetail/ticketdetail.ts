import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {Garage_API} from "../../Shared/Garage_API";
import {ProfilePage} from "../profile/profile";
import {NewTicketPage} from "../new-ticket/new-ticket";
import { Storage } from '@ionic/storage'

/**
 * Generated class for the TicketdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ticketdetail',
  templateUrl: 'ticketdetail.html',
})
export class TicketdetailPage {

  IP:any;
  ticket:any;
  user:any;
  car:any;
  TS:any;
  man:any;
  owner:any;
  private id: any;
  constructor(private storage:Storage,private LoadingC:LoadingController,private GAPI:Garage_API,public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.data.id;
      this.ticket = this.navParams.data.ticket;
      this.owner= this.navParams.data.owner;
      console.log(this.navParams.data);
      this.IP= localStorage.getItem("IP");


/*      loader.present().then(() => {this.GAPI.GetCar(this.ticket[0]).then(data => this.car=data);loader.dismiss(); });
      loader.present().then(() => {
          this.GAPI.getTs(this.car[0]).then(data => this.TS = data);

      })*/
  }
/*    ionViewDidEnter(){
      let loader = this.LoadingC.create({content: "Plus d'information ..."});
      loader.present().then(()=>{
          this.GAPI.getTs(this.car[0]).then(data => {
              this.TS=data;
              loader.dismiss();
              console.log(this.TS);
          })
      })
}*/

userTapped($event, user){
    this.navCtrl.push(ProfilePage,{"user": user, "owner":false});
}

  ionViewWillEnter() {

      console.log('ionViewDidLoad TicketdetailPage');
/*      let loader = this.LoadingC.create({content : "something"});
      this.GAPI.getUSER(this.ticket[1]).then(data => this.user=data);
      loader.present().then(() => {this.GAPI.GetCar(this.ticket[0]).then(data => this.car=data);loader.dismiss(); });
      loader.present().then(() => {
          this.GAPI.getTs(this.car[0]).then(data => this.TS = data);

      })*/

      let loader = this.LoadingC.create({content : "Recherches de données ..."});
      loader.present().then(() => {
            this.GAPI.getUSER(this.ticket[1]).then(data =>{
                this.user=data;
                console.log(this.user);
            })
          this.GAPI.GetCar(this.ticket[0]).then(data =>{
              this.car=data;
              console.log(this.car)


                  this.GAPI.getTs(this.car[0][0]).then(data => {
                      this.TS=data;
                      loader.dismiss();
                      console.log(this.TS);
                  })
              loader.dismiss();
          })
      });
  }
  goToEdit($event,ticket,user,car,TS){
  this.storage.get("CUser").then(id =>{
    console.log(id);
    this.navCtrl.push(NewTicketPage,{ticket,user,car,TS,id});
  })

  }
}
