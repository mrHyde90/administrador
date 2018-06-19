import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {InstrumentListComponent} from "./instruments/instrument-list/instrument-list.component";

const routes: Routes = [
  { path: '', component: InstrumentListComponent },
  { path: 'categories/:type', component: InstrumentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}