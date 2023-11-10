import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Login, ResponseLogin} from "../models/Login";
import {HttpClient} from "@angular/common/http";
import {Register, ResponseRegister} from "../models/Register";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  authentication:ResponseLogin;
  urlpath="http://localhost:50947/api/";
  constructor(private http: HttpClient) {
    this.authentication = this.loadLocalStorage();
  }

  LoginAuthentication(form:Login):Observable<ResponseLogin[]>{
    return this.http.post<ResponseLogin[]>(this.urlpath+'User/Login',form);
  }
  SignUp(object:Register):Observable<ResponseRegister[]>{
    return this.http.post<ResponseRegister[]>(this.urlpath+'register',object);
  }


  loadLocalStorage() {
    let data:any = localStorage.getItem('session');
    return JSON.parse(data);
  }

  logout() {
    localStorage.clear();
  }
}
