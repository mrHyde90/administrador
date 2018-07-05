import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	userData: UserModel;

	navLinks= [
		{path: "pending", label: "Pendientes" },
		{path: "accept", label: "Prestamos" }
	];

  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.userData = this.authService.getUser();
  }

}
