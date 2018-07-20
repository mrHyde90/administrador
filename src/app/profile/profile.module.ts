import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { RequestListComponent } from '../request/request-list/request-list.component';
import {AngularMaterialModule} from '../angular-material.module';
import {SharedModule} from '../shared/shared.module';

import {ProfileRoutingModule} from './profile-routing.module';


@NgModule({
  declarations: [
    ProfileComponent,
    RequestListComponent
  ],
  imports: [
  	CommonModule,
    AngularMaterialModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule {}