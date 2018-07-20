import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
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
  MatPaginatorModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule, 
  MatIconModule,
  MatButtonToggleModule,
  MatAutocompleteModule
} from "@angular/material";


@NgModule({
	exports: [
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
	    MatTabsModule,
	    MatSidenavModule,
	    MatListModule,
	    MatIconModule,
	    MatButtonToggleModule,
	    LayoutModule,
	    MatAutocompleteModule
	]
})
export class AngularMaterialModule {

}