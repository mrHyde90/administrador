import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {AngularMaterialModule} from '../angular-material.module';
import {SharedModule} from '../shared/shared.module';

import { OwnerComponent } from './owner.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { UserSearchComponent } from '../user-search/user-search.component';
import { UserRequestComponent } from '../user-request/user-request.component';

import { InstrumentSearchComponent } from '../instruments/instrument-search/instrument-search.component';
import { InstrumentStartComponent } from '../instruments/instrument-start/instrument-start.component';
import { InstrumentCreateComponent } from '../instruments/instrument-create/instrument-create.component';


import {OwnerRoutingModule} from './owner-routing.module';
@NgModule({
  declarations: [
    OwnerComponent,
    SignupComponent,
    UserSearchComponent,
    UserRequestComponent,
    InstrumentCreateComponent,
    InstrumentStartComponent,
    InstrumentSearchComponent
  ],
  imports: [
  	CommonModule,
    AngularMaterialModule,
    SharedModule,
    OwnerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OwnerModule {}