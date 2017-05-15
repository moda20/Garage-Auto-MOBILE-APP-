import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {Headers,Http} from "@angular/http";
import {Camera, CameraOptions} from "@ionic-native/camera"
/**
 * Generated class for the NewTicketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-ticket',
  templateUrl: 'new-ticket.html',
})
export class NewTicketPage {
  IP:any;
  ticket:any;
  NewTicketURL:any;
  curUserId:any;
  contentHeader = new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8; application/json'});
  private Name: string;
  private CarName: any;
  private CarModel: any;
  private Price: any;
  private Manf: any;
  private image: any;
  private Carburant: any;
  private CU100: any;
  private Longeur: any;
  private MaxRev: any;
  private PF: any;
  private VolRev: any;
  private user: any | string | any;
  private car: any;
  private TS: any;
  private base64textString: string;
  private id: any;
  private Description: any;
  constructor(private platform : Platform,private Camera: Camera,private toastCtrl:ToastController,private http:Http,private LoadingC:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.curUserId =this.navParams.data.id;
    this.ticket = this.navParams.data.ticket;
    this.user = this.navParams.data.user;
    this.car = this.navParams.data.car;
    this.TS = this.navParams.data.TS;

    console.log("TICKET IS  ", this.ticket);
    console.log("USER ID ASSED ON : ",this.curUserId);
    console.log(this.user, this.car,this.TS);
    this.IP=localStorage.getItem('IP');
    this.NewTicketURL=this.IP+"NewTicketAPI";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTicketPage');
    if (this.ticket){
       this.Name = this.ticket.nom;
       this.CarName =this.car[0].nomVoiture;
       this.CarModel = this.car[0].ModeleVoiture;
       this.Price = this.ticket.Prix;
       this.Manf = this.car[0][1].Nom;
       this.Carburant = this.TS[0].carburant;
       this.CU100 = this.TS[0].consommationUrbaine100Km;
       this.Longeur = this.TS[0].longeur;
       this.MaxRev = this.TS[0].revisionJm;
       this.PF = this.TS[0].puissanceFiscale;
       this.VolRev = this.TS[0].VovolumeReservoir;
       this.id = this.ticket.id;
       this.Description = this.ticket.Description;
    }
  }
  validateticket(crs){
    console.log(crs);
    let loader = this.LoadingC.create({content : "Recherches de données ..."});
    loader.present().then(() => {
      this.http.post(this.NewTicketURL,{"Uid" : this.curUserId,"crs" : crs}, { headers: this.contentHeader })
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
    this.showToast("top",val.message);
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
        "id" : this.curUserId
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

  takeAPicture(){
    this.platform.ready().then(()=>{
      let options : CameraOptions = {
        destinationType: this.Camera.DestinationType.DATA_URL,
        sourceType: this.Camera.PictureSourceType.CAMERA,
        encodingType: this.Camera.EncodingType.PNG,
        targetHeight: 500,
        targetWidth: 500,
        saveToPhotoAlbum: false
      };

      this.Camera.getPicture(options).then((imageUri) => {
        this.image = imageUri;
      });
    })
  }
  emptyPicture(){
    this.image = null;
  }
}
