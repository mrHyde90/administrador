import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html"
}) 
export class ModalComponent  {
	buenFormato: Boolean = true;
	textoFormato: string = "";

	constructor(public dialogRef: MatDialogRef<ModalComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {}

	onNoClick(): void {
    	this.dialogRef.close();
  	}

  	onPrestar(cantidadInput: HTMLInputElement): void {
  		const cantidadString: string = cantidadInput.value;
  		if(cantidadString.search(/^\d{1,2}$/) == -1){
  			this.buenFormato = false;
  			this.textoFormato = "La cadena no cumple con el formato";
  		} else {
  			const cantidadNumerica: number = parseInt(cantidadString);
  			if(cantidadNumerica <= this.data.cantidad){
  				this.dialogRef.close(cantidadNumerica);
  			} else {
  				this.buenFormato = false;
  				this.textoFormato = "La cantidad es mayor a la actual";
  			}
  		}
  	}
}