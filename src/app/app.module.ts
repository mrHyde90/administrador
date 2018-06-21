import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
  MatPaginatorModule
} from "@angular/material";
import { HeaderComponent } from './header/header.component';
import { InstrumentListComponent } from './instruments/instrument-list/instrument-list.component';
import {ModalComponent} from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InstrumentListComponent,
    ModalComponent
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
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
