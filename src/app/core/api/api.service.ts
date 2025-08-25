import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http:HttpClient) { }

  get<T>(endpoint:string){
    return this.http.get<T>(`${this.API_URL}${endpoint}`);
  }

  post<T>(endpoint:string,body:any){
    return this.http.post<T>(`${this.API_URL}${endpoint}`, body);
  }



}
