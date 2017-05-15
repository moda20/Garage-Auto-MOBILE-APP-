import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Garage_API} from "../../Shared/Garage_API";
import {Storage} from "@ionic/storage";
import {TicketdetailPage} from "../ticketdetail/ticketdetail";
import {Headers,Http} from "@angular/http";
import {NewTicketPage} from "../new-ticket/new-ticket";
import {ProfilePage} from "../profile/profile";


/**
 * Generated class for the MyTicketsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-tickets',
  templateUrl: 'my-tickets.html',
})
export class MyTicketsPage {
  IP:any;
  Cuser:any;
  UserObjec:any;
  Tickets :any;
  TTC:any;
  contentHeader = new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8; application/json'});
  ticket:any;
  user:any;
  car:any;
  TS:any;
  man:any;
  owner:any;
  constructor(private  toastCtrl :ToastController,private alertCtrl:AlertController,private http:Http,private storage:Storage,private LoadingC:LoadingController,private GAPI:Garage_API,public navCtrl: NavController, public navParams: NavParams) {
    this.IP=localStorage.getItem('IP');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTicketsPage');
    let loader = this.LoadingC.create({content:"Recherche en cours ..."})
    loader.present().then(() => {
      this.storage.get('CUser').then(profile => {
        this.Cuser = JSON.parse(profile);
        this.http.post(this.IP+"MYTICKETS", {"id" : this.Cuser}, { headers: this.contentHeader })
          .map(res => res.json())
          .subscribe(

            data => this.Tickets=data,
            data => this.TTC=data,
          );
      });
      loader.dismiss();
    })
    console.log(this.Cuser);


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
      this.Tickets=this.TTC;
    }
  }
  CardTapped($event, ticket){
    this.navCtrl.push(TicketdetailPage, {ticket, "owner" : true});
  }
  EditTicket($evt, ticket){
    let loader = this.LoadingC.create({content : "Recherches de données ..."});
    loader.present().then(() => {
      this.GAPI.getUSER(ticket[1]).then(data =>{
        this.user=data;
        console.log(this.user);
      })
      this.GAPI.GetCar(ticket[0]).then(data =>{
        this.car=data;
        console.log(this.car)
        this.GAPI.getTs(this.car[0][0]).then(data => {
          this.TS=data;
          loader.dismiss();
          console.log(this.TS);
          let car= this.car;
          let user = this.user;
          let TS= this.TS;
          this.storage.get("CUser")
            .then(id =>{
              console.log(id);
              this.navCtrl.push(NewTicketPage,{ticket,user,car,TS,id});
            })
        })

      })

    });

  }

  deleteTicket($evt,ticket){


      let confirm = this.alertCtrl.create({
        title: "Supprimer L'annonce ?",
        message: "Voulez vous vraiment supprimer l'annonce ?",
        buttons: [
          {
            text: 'Annuler',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Supprimer',
            handler: () => {
              console.log('Starting Removal');
              this.http.post(this.IP+"DELTICKET", {"id" : ticket.id}, { headers: this.contentHeader })
                .map(res => res.json())
                .subscribe(
                  data =>this.showToast("top",data.message),
                );
            }
          }
        ]
      });
      confirm.present();




  }
  gotoAuthor($evt, ticket){
    let loader = this.LoadingC.create({content : "Recherches de données ..."});
    loader.present().then(() => {
      this.GAPI.getUSER(ticket[1]).then(data =>{
        this.user=data;
        console.log(this.user);
        loader.dismiss();
        this.navCtrl.push(ProfilePage,{"user": this.user, "owner":false});
      })});
  }
  showToast(position: string,text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: position
    });
    toast.present(toast).then(()=>{
      this.navCtrl.pop();
      this.navCtrl.push(MyTicketsPage);
    });

  }
}
