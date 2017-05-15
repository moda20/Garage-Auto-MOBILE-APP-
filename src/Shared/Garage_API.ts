/**
 * Created by jaxle on 5/1/2017.
 */
import {Injectable} from '@angular/core' ;
import {Http, Response} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/observable';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Storage} from "@ionic/storage";
@Injectable()

export class Garage_API {

    private Url_Base = "";
    private jwtHelper: JwtHelper;
    public token = this.storage.get('token');

    constructor(private storage: Storage, private http: Http) {
      this.Url_Base= localStorage.getItem("IP");
      console.log(this.Url_Base);
    }

    public getAlltickets() {
        return new Promise(resolve => {
            this.http.get(`${this.Url_Base}AllTickets.json`).subscribe(res => resolve(res.json()));
        })
    }

    public GetCar(id) {
        return new Promise(resolve => {
            this.http.get(`${this.Url_Base}Car/${id}`).subscribe(res => resolve(res.json()));
        });

    }

    public GetSearchResults(word) {
        return new Promise(resolve => {
            this.http.get(`${this.Url_Base}Search/${word}`).subscribe(res => resolve(res.json()));
        });

    }

    public getTs(id) {
        return new Promise(resolve => {
            this.http.get(`${this.Url_Base}TS/${id}`).subscribe(res => resolve(res.json()));
        })
    }

    public getUSER(id) {
        return new Promise(resolve => {
            this.http.get(`${this.Url_Base}USER/${id}`).subscribe(res => resolve(res.json()));
        })
    }
    gettoken(){

    }

    public static authenticated() {

        return tokenNotExpired(null, '');
    }

}
