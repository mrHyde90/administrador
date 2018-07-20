/*
  1- poner el borrar solicitud e incrementar la herramienta
  2- agregar la matricula en el modelo de solicitud
  3- poner un paginator en solicitudes

*/
//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

//Core Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
//Modals
import {ModalGenericComponent} from './modal-generic/modal-generic.component';
import {ModalComponent} from './modal/modal.component';

//Interceptors
import { AuthInterceptor } from "./auth/auth-interceptor";
import {ErrorInterceptor} from './error-interceptor';

//Features Modules
import { AppRoutingModule } from "./app-routing.module";
import { AngularMaterialModule } from "./angular-material.module";
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    SigninComponent,
    ModalGenericComponent
  ],
  entryComponents: [ ModalComponent, ModalGenericComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
