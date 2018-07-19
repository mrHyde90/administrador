import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import {AuthModel} from './auth.model';
import {UserModel} from './user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private base_url = "/api/user";
	private token: string;
	private isAuthenticated = false;
	private tokenTimer: any;
	private authStatusListener = new Subject<boolean>();
  private userData: UserModel = {email: "", matricula: "", carrera: "", name: "", user_type: ""};

  constructor(private http:HttpClient, private router: Router) { }

  getAuth(){
  	return this.isAuthenticated;
  }

  isAdmin(){
    if(!this.isAuthenticated){
      return false;
    }
    return this.userData.user_type === "Admin";
  }

  getUser(){
    return this.userData;
  }

  getToken(){
  	return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, matricula: string, carrera: string, name: string){
  	const usuario: any = {
  		email: email, 
  		password: password, 
  		matricula: matricula, 
  		carrera: carrera, 
  		name: name
  	};
  	return this.http.post(`http://localhost:3000${this.base_url}/signup`, usuario);
  }

  login(email: string, password: string){
  	const authData: AuthModel = {email: email, password: password};
  	this.http
  		.post<{token: string, expiresIn: number, userData: UserModel}>(
  			`http://localhost:3000${this.base_url}/signin`,
  			 authData
  		)
  		.subscribe(response => {
  			const token = response.token;
  			this.token = token;
  			if(token){
  				const expiresIn = response.expiresIn;
          const userData: UserModel = response.userData;
          this.userData = userData;
  				this.setAuthTimer(expiresIn);
  				this.isAuthenticated = true;
  				this.authStatusListener.next(true);
  				const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(token, expirationDate, userData);
  				this.router.navigate(["/"]);
  			} 
  		} , error => {
        this.authStatusListener.next(false);
      })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    console.log("Bienvenido usuario");
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userData = authInformation.userData;
      console.log(this.userData);
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
  	this.token = null;
  	this.isAuthenticated = false;
    this.userData = {email: "", matricula: "", carrera: "", name: "", user_type: ""};
  	this.authStatusListener.next(false);
  	clearTimeout(this.tokenTimer);
  	this.clearAuthData();
  	this.router.navigate(["/"]);
  }

  //poner la hora de expiracion del token
  private setAuthTimer(duration: number){
  	console.log("duracion: " + duration);
  	this.tokenTimer = setTimeout(() => {
  		this.logout();
  	}, duration * 1000);
  }

  //usar el localstorage para guardar el token y la fecha de expiracion
  private saveAuthData(token: string, expirationDate: Date, userData: UserModel) {
    console.log("Dentro del saveAuth");
    console.log(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  //clear the lcoal storage
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userData");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userData: UserModel = JSON.parse(localStorage.getItem("userData"));
    console.log("Dentro del getAuth");
    console.log(userData);
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userData: userData
    }
  }

}
