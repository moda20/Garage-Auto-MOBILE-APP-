import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http} from "@angular/http";
import {JwtHelper} from "angular2-jwt";
import { Storage } from '@ionic/storage'
import {Garage_API} from '../../Shared/Garage_API';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authType: string = "login";
  IP:any;


  constructor(private LoadingC:LoadingController,private toastCtrl:ToastController,public storage:Storage,public http:Http,public GAPI:Garage_API,public navCtrl: NavController, public navParams: NavParams) {
    this.IP = localStorage.getItem("IP");
    this.LOGIN_URL = this.IP+"LoginAPI";
    storage.ready().then(() => {
      storage.get('profile').then(profile => {
        this.user = JSON.parse(profile);
        console.log(this.user);
      }).catch(console.log);
    });
  }
  private LOGIN_URL :any;
  private SIGNUP_URL = "http://localhost:3001/users";

  // We need to set the content type for the server
  contentHeader = new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8; application/json'});
  error: string;
  jwtHelper = new JwtHelper();
  user: string;
  Login:any;
  password:any;
  CUser:any;
  Connect(credentials) {
    this.authType == 'login' ? this.login(credentials) : this.signup(credentials);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(credentials) {
    console.log(credentials);
    let loader = this.LoadingC.create({content : "Recherches de données ..."});
    loader.present().then(() => {
    this.http.post(this.LOGIN_URL, credentials, { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
            data => this.authSuccess(data.token,data.userId),
            err => this.error = err,

        );
    loader.dismiss();
    });
  }

  signup(credentials) {
    this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
            data => this.authSuccess(data.token,data.userId),
            err => this.error = err
        );
  }


  authSuccess(token,Id) {
    this.error = null;
    this.storage.set('token', token);
    localStorage.setItem('token',token);
    this.user = this.jwtHelper.decodeToken(token).username;
    console.log(this.user);
    this.storage.set('profile', this.user);
    this.CUser = Id;
    this.storage.set('CUser', this.CUser);
    this.showToast("top");
  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Connexion établie ..',
      duration: 2000,
      position: position
    });
    toast.present(toast).then(()=>{
      this.navCtrl.popToRoot({
        "id" : this.CUser
      });
    });

  }

}
