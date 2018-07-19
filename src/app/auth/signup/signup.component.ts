import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import {AuthService} from '../auth.service';
import {UserService} from '../../user-search/user.service';
import {UserModel} from '../user.model';

import { MatDialog } from "@angular/material";
import { ModalGenericComponent } from "../../modal-generic/modal-generic.component";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	isLoading = false;
  form: FormGroup;
  user: UserModel;
  private mode = "create";
  private user_id: string;

  isCreate(){
    return this.mode === "create";
  }

  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required]}),
      carrera: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, {validators: [Validators.required]}),
      matricula: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("id")){
        this.mode = "edit";
        this.user_id = paramMap.get("id");
        this.isLoading = true;
        this.userService.searchUserById(this.user_id)
          .subscribe(userData => {
            this.isLoading = false;
            this.user = {
              _id: userData.user._id,
              email: userData.user.email,
              carrera: userData.user.carrera,
              matricula: userData.user.matricula,
              name: userData.user.name
            }
            this.form.setValue({
              email: this.user.email,
              password: "l",
              carrera: this.user.carrera,
              matricula: this.user.matricula,
              name: this.user.name
            });
          })
      } else {
        this.mode = "create";
        this.user_id = null;
      }
    })
  }

  onSavePost(){
    console.log(this.form.invalid);
    if(this.form.invalid){
      return;
    }
    console.log(this.mode);
    let Message = "";
    this.isLoading = true;
    if(this.mode === "create"){
      this.authService.createUser(this.form.value.email, 
          this.form.value.password, 
          this.form.value.matricula, 
          this.form.value.carrera, 
          this.form.value.name
        )
        .subscribe(result => {
          console.log(result);
          this.isLoading = false;
          Message = "User Created!!";
          this.dialog.open(ModalGenericComponent, {data: {message: Message}});
          this.form.reset();
        } , error => {
        this.isLoading = false;
      });
    } else{
      this.userService.updateUser(this.user_id, 
          this.form.value.carrera, 
          this.form.value.matricula, 
          this.form.value.email, 
          this.form.value.name
        )
        .subscribe(response => {
          console.log(response);
          this.isLoading = false;
          Message = "User Updated!!";
          this.dialog.open(ModalGenericComponent, {data: {message: Message}});
        } , error => {
        this.isLoading = false;
      });
    }
  }
}
