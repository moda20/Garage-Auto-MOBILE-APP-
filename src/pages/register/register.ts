import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Headers,Http} from '@angular/http'
import {JwtHelper} from "angular2-jwt";
import {Storage} from '@ionic/storage'


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  IP:any;
  User :any;
  UserId:any;
  NewUserURL:any;
  EditUser:any;
  contentHeader = new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8; application/json'});
  jwtHelper = new JwtHelper();
  private UserName: any;
  private Password: any;
  private Nom: any;
  private Prenom: any;
  private Email: any;
  private TEL: any;
  private Ville: any;
  private Pays: any;
  private CP: any;
  private id:any;
  private image:any;
  private base64textString: string;
  constructor(private storage:Storage,private http:Http,private LoadingC:LoadingController,private toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  this.IP = localStorage.getItem("IP");
  this.NewUserURL = this.IP+"NewUserAPI";
  this.EditUser = this.navParams.data.user;
  console.log(this.EditUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    if (this.EditUser && this.EditUser!=null){
      this.UserName = this.EditUser[0].Username;
      this.Nom = this.EditUser[0].nom;
      this.Prenom = this.EditUser[0].prenom;
      this.Email = this.EditUser[0].mail;
      this.TEL = this.EditUser[0].numTel;
      this.Ville = this.EditUser[0].ville;
      this.Pays = this.EditUser[0].pays;
      this.CP = this.EditUser[0].codePostal;
      this.id = this.EditUser[0].id;
      this.image = this.EditUser[0].image;
    }
  }



  NewUser(crs){
    console.log(crs);
    let loader = this.LoadingC.create({content : "Validation des information .."});
    loader.present().then(() => {
      this.http.post(this.NewUserURL,crs, { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
          data => this.successTicketPost(data),
          err => this.error(err),

        );
      loader.dismiss();
    });
  }
  successTicketPost(val){
    console.log(val);
    this.error = null;
    this.storage.set('token', val.user[0].token);
    localStorage.setItem('token',val.user[0].token);
    this.User = this.jwtHelper.decodeToken(val.user[0].token).username;
    console.log(this.User);
    this.storage.set('profile', this.User);
    this.UserId = val.user[0].id;
    this.storage.set('CUser', this.UserId);
    this.showToast("top",val.message)
  }

  error(val){
    console.log("Error val : ",val);
    this.showToast("top","Erreur de connexion")
  }
  showToast(position: string,text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1300,
      position: position
    });
    toast.present(toast).then(()=>{
      this.navCtrl.popToRoot({
        "id" : this.UserId
      });
    });

  }
  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
    this.image=btoa(binaryString);
  }

}
