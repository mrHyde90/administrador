import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InstrumentListComponent} from "../instruments/instrument-list/instrument-list.component";

import {SignupComponent} from "../auth/signup/signup.component";
import {OwnerComponent} from '../owner/owner.component';
import {UserSearchComponent} from '../user-search/user-search.component';
import {UserRequestComponent} from '../user-request/user-request.component';

import {InstrumentSearchComponent} from '../instruments/instrument-search/instrument-search.component';
import {InstrumentStartComponent} from '../instruments/instrument-start/instrument-start.component';
import {InstrumentCreateComponent} from '../instruments/instrument-create/instrument-create.component';

import {AdminGuard} from '../auth/admin.guard';

const ownerRoutes: Routes = [
  {path: "", component: OwnerComponent, canActivate: [AdminGuard], children: [
    {path: "signup", component: SignupComponent},
    {path: "usuarios", component: UserSearchComponent},
    {path: "usuarios/solicitudes/:id", component: UserRequestComponent},
    {path: "usuarios/edit/:id", component: SignupComponent},
    {path: "solicitudes", component: UserRequestComponent},
    {path: "instruments", component: InstrumentStartComponent, children: [
      {path: "categories/:instrument_type", component: InstrumentListComponent}
    ]},
    {path: "instruments/creation", component: InstrumentCreateComponent},
    {path: "instruments/edit/:id", component: InstrumentCreateComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(ownerRoutes)
  ],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class OwnerRoutingModule {}