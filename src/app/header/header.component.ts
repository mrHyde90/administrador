import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../auth/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	userIsAuthenticated = false;
	private authListenerSubs: Subscription;
  userData: UserModel;
  userIsAdmin = false;
	
  constructor(private authService: AuthService) { }

  ngOnInit() {
  	this.userIsAuthenticated = this.authService.getAuth();
    this.userData = this.authService.getUser();
    this.userIsAdmin = this.authService.isAdmin();
  	this.authListenerSubs = this.authService.getAuthStatusListener()
  		.subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userData = this.authService.getUser();
        this.userIsAdmin = this.authService.isAdmin();
      });
  }

  onLogout(){
  	this.authService.logout();
  }

  ngOnDestroy(){
  	this.authListenerSubs.unsubscribe();
  }

}
