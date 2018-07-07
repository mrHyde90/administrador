import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';

import { AppRoutingModule } from "./app-routing.module";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatMenuModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule, 
  MatIconModule,
  MatButtonToggleModule
} from "@angular/material";
import { HeaderComponent } from './header/header.component';
import { InstrumentListComponent } from './instruments/instrument-list/instrument-list.component';
import {ModalComponent} from './modal/modal.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ProfileComponent } from './profile/profile.component';
import { RequestListComponent } from './request/request-list/request-list.component';
import { ReversePipe } from './request/reverse.pipe';
import { OwnerComponent } from './owner/owner.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserRequestComponent } from './user-request/user-request.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InstrumentListComponent,
    ModalComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    RequestListComponent,
    ReversePipe,
    OwnerComponent,
    UserSearchComponent,
    UserRequestComponent
  ],
  entryComponents: [InstrumentListComponent, ModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
  	MatCardModule,
  	MatButtonModule,
  	MatToolbarModule,
  	MatExpansionModule,
  	MatProgressSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
