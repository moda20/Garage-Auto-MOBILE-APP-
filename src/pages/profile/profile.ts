import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Garage_API} from "../../Shared/Garage_API";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  IP:any;
  user:any;
  owner:any;
  constructor(private LoadingC:LoadingController,private GAPI:Garage_API,public navCtrl: NavController, public navParams: NavParams) {
    this.user= this.navParams.data.user;
    this.owner= this.navParams.data.owner;
    console.log("user is  ",this.user);
    this.IP=localStorage.getItem("IP");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goToEdit(ev,id){
  let loader = this.LoadingC.create({content:"Recherche en cours ..."})
  loader.present().then(() => {
    this.GAPI.getUSER(id).then(data=>{
      this.navCtrl.push(RegisterPage,{"user": data, "owner":true});
      loader.dismiss();
    });
  });
  }
}
