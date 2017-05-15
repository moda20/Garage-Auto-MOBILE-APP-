import {Component, ViewChild, TemplateRef} from '@angular/core';
import {Nav, Platform, LoadingController,  ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ProfilePage} from "../pages/profile/profile";
import {MyTicketsPage} from "../pages/my-tickets/my-tickets";
import {NewTicketPage} from "../pages/new-ticket/new-ticket";
import {Garage_API} from '../Shared/Shared'
import {HttpModule} from  '@angular/http'
import {LoginPage} from "../pages/login/login";
import {Storage} from '@ionic/storage'
import {AuthService} from "../Shared/AUTH";
import {RegisterPage} from "../pages/register/register";
@Component({
  templateUrl: 'app.html',
  providers : [
      Garage_API,
    HttpModule,
      AuthService,

  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  IP:any;
  rootPage: any = HomePage;
  auth:any;
  connectedUser:any;
  User:any;

  constructor(private toastCtrl:ToastController,private API:AuthService,private LoadingC:LoadingController,private storage:Storage,private GAPI:Garage_API,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.auth = API;
    this.IP=localStorage.getItem('IP');


    // used for an example of ngFor and navigation

  }
  ionViewWillEnter(){

      this.GAPI.getUSER(this.storage.get('CUser')).then(data =>{
        this.connectedUser=data;
        console.log(this.connectedUser);
      });
    this.storage.get('profile').then(profile => this.User=profile);
  }
  ionViewDidLoad(){
    this.storage.get('CUser').then(CUser => {
      this.GAPI.getUSER(JSON.parse(CUser)).then(data =>{
        this.connectedUser=data;
        console.log(this.connectedUser);})
    });

    }
    getuser(){
      this.storage.get('CUser').then(CUser => {
        this.GAPI.getUSER(JSON.parse(CUser)).then(data =>{
          this.connectedUser=data;
          console.log(this.connectedUser);
          this.nav.push(ProfilePage,{"user": this.connectedUser, "owner":true});
        })
      });
    }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('CUser').then(CUser => {
        this.GAPI.getUSER(JSON.parse(CUser)).then(data =>{
          this.connectedUser=data;
          console.log(this.connectedUser);})
        });
    });
  }
  STORAGEIP(ev){
    let loader = this.LoadingC.create({content:"Recherche en cours ..."})
    loader.present().then(() =>{
      console.log(this.IP);
      localStorage.setItem("IP",this.IP);
      loader.dismiss();
      this.nav.popToRoot().then(()=>{
        this.nav.push(HomePage);
      });
    })

  }
  goHome(){
    this.nav.push(HomePage);
  }
  goprofile(){
    this.getuser();

  }
  goMytickets(){

    this.nav.push(MyTicketsPage,this.connectedUser);
  }
  goRegister(){
    this.nav.push(RegisterPage,{"user": null, "owner":true})
  }
  goNewticket(){
    this.nav.push(NewTicketPage,{"id": this.connectedUser[0].id, "ticket": null});
  }
  goDisconnect(){
    this.nav.push(LoginPage);
  }


  Disconnect(){
    this.User =null;
    this.connectedUser = null;
    this.logout();

  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: ' Vous avez été Déconnecté ..',
      duration: 1800,
      position: position
    });
    toast.present(toast).then(()=>{
      this.nav.popToRoot().then(()=>{
        this.nav.push(HomePage);
      });

    });

  }
  logout() {
    this.storage.remove('token');
    this.storage.remove('CUser');
    this.storage.remove('profile');
    localStorage.removeItem('token');
    this.showToast("top")
  }



}
