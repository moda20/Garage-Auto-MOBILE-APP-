import {Injectable} from "@angular/core";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {Storage} from "@ionic/storage";
/**
 * Created by jaxle on 5/4/2017.
 */
@Injectable()
export class AuthService  {

    private jwtHelper: JwtHelper = new JwtHelper();
    private storage : Storage = new Storage();
    private token = this.storage.get("token");

    authenticated() {

            return tokenNotExpired('token');
    }

}