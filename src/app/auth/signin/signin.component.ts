import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import {AuthService} from '../auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	isLoading = false;

  constructor(private authService: AuthService) { }

  onLogin(form: NgForm){
  	if(form.invalid){
  		console.log("Lol");
  		return;
  	}
  	console.log(form);
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnInit() {
  }

}
