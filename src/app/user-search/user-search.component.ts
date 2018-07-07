import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {UserModel} from '../auth/user.model';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
	user: UserModel = {
		email: "",
		matricula: "",
		carrera: "",
		name: "",
		user_type: ""
	};
	mostrar = false;


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  eliminarUsuario(user_id: string){
    this.userService.deleteUser(user_id)
      .subscribe(() => {
        this.clearAll();
      });
  }

  clearAll(){
    this.user = {
      email: "",
      matricula: "",
      carrera: "",
      name: "",
      user_type: ""
    };
    this.mostrar = false;
  }

  searchUser(inputMatricula: HTMLInputElement){
  	this.clearAll();
  	console.log(inputMatricula.value);
  	this.userService.searchUsers(inputMatricula.value)
  		.subscribe(results => {
  			this.user = results.user;
  			this.mostrar = true;
  		});
  }

}
