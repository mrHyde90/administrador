import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {InstrumentListComponent} from "./instruments/instrument-list/instrument-list.component";
import {SigninComponent} from "./auth/signin/signin.component";


import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: InstrumentListComponent },
  { path: 'categories/:type', component: InstrumentListComponent },
  {path: "signin", component: SigninComponent, canActivate: [AuthGuard]},
  {path: "owner",  loadChildren: './owner/owner.module#OwnerModule'},
  {path: "profile", loadChildren: './profile/profile.module#ProfileModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}