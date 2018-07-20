import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../angular-material.module';
import { RouterModule} from "@angular/router";
import { ReversePipe } from './reverse.pipe';
import {InstrumentListComponent} from "../instruments/instrument-list/instrument-list.component";

@NgModule({
  declarations: [
  	ReversePipe,
    InstrumentListComponent
  ],
  imports: [
  	CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReversePipe,
    InstrumentListComponent
  ]
})
export class SharedModule {}