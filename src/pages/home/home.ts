import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Garage_API} from "../../Shared/Garage_API";
import {TicketdetailPage} from "../ticketdetail/ticketdetail";
import {Storage} from '@ionic/storage'
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  IP:any;
  Cuser:any;
  UserObjec:any;
  Tickets :any;
  constructor(private storage:Storage,private LoadingC:LoadingController,private GAPI:Garage_API,public navCtrl: NavController, public navParams: NavParams) {
    this.IP= localStorage.getItem("IP");
  }

  ionViewDidLoad() {
    console.log('ionViewLoaded HomePage');
    this.Cuser=this.navParams.data;
    this.GAPI.getAlltickets().then(data =>this.Tickets = data);
    console.log(this.Cuser);
    if (this.Cuser.id){
      this.GAPI.getUSER(this.Cuser.id).then(
          data =>{
             this.UserObjec = data;
            this.storage.set('UserObjec',this.UserObjec);
          }
      );
    }
  }

  SearchResults(ev:any){
     let valuec = ev.target.value;
    if (valuec && valuec.trim() != ''){
      let loader = this.LoadingC.create({content:"Recherche en cours ..."})
      loader.present().then(() => {
        this.GAPI.GetSearchResults(valuec).then(data =>{
          this.Tickets=data;
          loader.dismiss();
        })
      });
    }else {
      this.GAPI.getAlltickets().then(data =>this.Tickets = data);
    }
  }
  CardTapped($event, ticket){
    this.navCtrl.push(TicketdetailPage, {ticket, "owner" : false});
  }

}
