import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginRequest} from "../models/login-request.model";
import {Observable, tap} from "rxjs";
import {AuthResponse} from "../models/auth-response.model";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";
import {RegisterRequest} from "../models/register-request.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL =`${environment.apiUrl}/api/v1/auth` ;


  constructor(
    private http:HttpClient,
    private router:Router
  )
  { }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/authenticate`, credentials)
      .pipe(tap(response => this.storeTokens(response)));
  }

register(userData: RegisterRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData)
}

private storeTokens(response:AuthResponse):void{
    localStorage.setItem('access_token',response.accessToken );
    localStorage.setItem('refresh_token',response.refreshToken );

}


getAccessToken():string|null{
    return localStorage.getItem('access_token');
}


logout():void{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
}

isLoggedIn():boolean{
    return !!this.getAccessToken();
}























}
