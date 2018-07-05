import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import {InstrumentListComponent} from "./instruments/instrument-list/instrument-list.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {ProfileComponent} from './profile/profile.component';
import {RequestListComponent} from './request/request-list/request-list.component';

import {AuthGuard} from './auth/auth.guard';
import {ProfileGuard} from './auth/profile.guard';

const routes: Routes = [
  { path: '', component: InstrumentListComponent },
  { path: 'categories/:type', component: InstrumentListComponent },
  {path: "signin", component: SigninComponent, canActivate: [AuthGuard]},
  {path: "signup", component: SignupComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [ProfileGuard], children: [
  	{path: ":request_type", component: RequestListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, ProfileGuard]
})
export class AppRoutingModule {}