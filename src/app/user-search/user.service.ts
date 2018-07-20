import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UserModel} from '../auth/user.model';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private baseUrl = environment.apiUrl + "/user";

  constructor(private http: HttpClient) { }

  updateUser(user_id: string, carrera: string, matricula: string, email: string, name: string){
    const userData: UserModel = {
      _id: user_id,
      carrera: carrera,
      matricula: matricula,
      email: email,
      name: name
    };
    return this.http.put(`${this.baseUrl}/${user_id}`, userData);
  }

  searchUsers(matricula: string){
  	const queryParams = `?matricula=${matricula}`;
  	return this.http.get<{user: UserModel}>(`${this.baseUrl}/search-users` + queryParams);
  }

  searchUserById(user_id: string){
    return this.http.get<{user: UserModel}>(`${this.baseUrl}/${user_id}`);
  }

  deleteUser(user_id: string){
  	return this.http
  		.delete(`${this.baseUrl}/${user_id}`);
  }
}
