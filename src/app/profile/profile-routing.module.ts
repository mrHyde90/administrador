import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { RequestListComponent } from '../request/request-list/request-list.component';
import {ProfileGuard} from '../auth/profile.guard';

const profileRoutes: Routes = [
  {path: "", component: ProfileComponent, canActivate: [ProfileGuard], children: [
    {path: ":request_type", component: RequestListComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule],
  providers: [ProfileGuard]
})
export class ProfileRoutingModule {}