import { Component, OnInit, Inject } from '@angular/core';
import {InstrumentModel} from '../instrument.model';
import {ModalComponent} from '../../modal/modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent implements OnInit {
	cantidadPrestada: string = "";
	
	instruments:InstrumentModel[] = [
		{name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Arduino", instrumentImage: "http://cdn-tienda.bricogeek.com/1157-thickbox_default/arduino-uno.jpg", cantidad: 0, categories: ["Herramientas"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]},
		{name: "Foco Led", instrumentImage: "https://cdn.sparkfun.com//assets/parts/3/3/8/0/09590-01.jpg", cantidad: 10, categories: ["Diodos"]},
		{name: "Martillo", instrumentImage: "https://ferreteriavidri.com/images/items/large/9781.jpg", cantidad: 3, categories: ["Herramientas"]},
		{name: "Condensador", instrumentImage: "http://www.teslaelectronics.cl/518-large_default/condensador-electrolitico.jpg", cantidad: 12, categories: ["Capacitores"]},
		{name: "Cargador", instrumentImage: "https://images-na.ssl-images-amazon.com/images/I/61j%2B0A3cxBL._SL1500_.jpg", cantidad: 4, categories: ["Transistores"]}
	];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void{
  	let dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { name: this.instruments[2].name, cantidad: this.instruments[2].cantidad }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.cantidadPrestada = result;
      console.log(typeof(result));
      console.log(result);
    });
  }

}