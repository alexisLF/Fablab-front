import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { AuthResp } from "./auth-resp.interface";
import { environment } from './../../../environments/environment';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = `${environment.apiURL}core/api/auth/`;
  public tokenSource = new BehaviorSubject<string>("");
  public token = this.tokenSource.asObservable();

  private isLoginSource = new BehaviorSubject<boolean>(true);
  public isLogin = this.isLoginSource.asObservable();

  constructor(private _httpClient: HttpClient, private _router: Router) {
    const token = localStorage.getItem("token");

    if (token !== null) {
      this.tokenSource.next(token);
    }
  }

  public login(user): Promise<string> {
    return this._httpClient
      .post(this.baseUrl + "signin", {
        username: user.mail,
        password: user.password,
      })
      .toPromise()
      .then((responseJson: AuthResp) => {
        this.isLoginSource.next(false);
        const token = responseJson.accessToken;
        this.tokenSource.next(token);
        localStorage.setItem("token", token);
        var decoded = jwt_decode(token);
        localStorage.setItem("role", decoded['role'])
        localStorage.setItem("mail", decoded['sub'])
        return token;
      })
      .catch((err) => {
        this.isLoginSource.next(true);
        localStorage.removeItem("token");
        return Promise.reject(err);
      });
  }

  activate(jwt): Promise<string> {
    return this._httpClient
      .post(this.baseUrl + "activate?jwt=" + jwt, {})
      .toPromise()
      .then((responseJson: AuthResp) => {
        this.isLoginSource.next(false);
        const token = responseJson.accessToken;
        this.tokenSource.next(token);
        localStorage.setItem("token", token);
        return token;
      })
      .catch((err) => {
        this.isLoginSource.next(true);
        localStorage.removeItem("token");
        return Promise.reject(err);
      });
  }

  public register(user): Promise<any> {
    return this._httpClient
      .post(this.baseUrl + "signup", {
        username: user.mail,
        password: user.password,
        group: "NONE",
        lastname: user.lastName,
        firstname: user.firstName,
        role: "STUDENT",
      })
      .toPromise();
  }

  logout(): void {
    this.isLoginSource.next(true);
    this.tokenSource.next("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this._router.navigate(["login"]);
  }

  isAuthenticated(): Promise<boolean> {
    return this._httpClient
      .post(
        this.baseUrl + "signin",
        {},
        {
          headers: {
            Authorization: `Bearer ${this.tokenSource.getValue()}`,
          },
        }
      )
      .toPromise()
      .then((responseJson: AuthResp) => {
        this.isLoginSource.next(false);
        const token = responseJson.accessToken;
        this.tokenSource.next(token);
        localStorage.setItem("token", token);
        return true;
      })
      .catch((err) => {
        this.isLoginSource.next(true);
        this.tokenSource.next("");
        localStorage.removeItem("token");
        this._router.navigate(["login"]);
        return false;
      });
  }
}
