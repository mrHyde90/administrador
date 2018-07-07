import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import {InstrumentListComponent} from "./instruments/instrument-list/instrument-list.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {ProfileComponent} from './profile/profile.component';
import {RequestListComponent} from './request/request-list/request-list.component';
import {OwnerComponent} from './owner/owner.component';
import {UserSearchComponent} from './user-search/user-search.component';
import {UserRequestComponent} from './user-request/user-request.component';

import {AuthGuard} from './auth/auth.guard';
import {ProfileGuard} from './auth/profile.guard';
import {AdminGuard} from './auth/admin.guard';

const routes: Routes = [
  { path: '', component: InstrumentListComponent },
  { path: 'categories/:type', component: InstrumentListComponent },
  {path: "signin", component: SigninComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [ProfileGuard], children: [
  	{path: ":request_type", component: RequestListComponent}
  ]},
  {path: "owner", component: OwnerComponent, canActivate: [AdminGuard], children: [
    {path: "signup", component: SignupComponent},
    {path: "usuarios", component: UserSearchComponent},
    {path: "usuarios/solicitudes/:id", component: UserRequestComponent},
    {path: "usuarios/edit/:id", component: SignupComponent},
    {path: "solicitudes", component: UserRequestComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, ProfileGuard, AdminGuard]
})
export class AppRoutingModule {}