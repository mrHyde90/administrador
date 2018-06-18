import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {InstrumentModel} from '../instrument.model';
import {ModalComponent} from '../../modal/modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs';
import {InstrumentsService} from '../instruments.service';

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent implements OnInit, OnDestroy {
  private subsIns: Subscription;
	
	instruments:InstrumentModel[] = [];

  constructor(public dialog: MatDialog, 
              private instrumentService: InstrumentsService) { }

  ngOnInit() {
    
    this.subsIns = this.instrumentService.getInstrumentUpdated()
      .subscribe((instruments: InstrumentModel[]) => {
        this.instruments = instruments;
      });
      this.instrumentService.getInstruments();
  }

  openDialog(_id: string): void{
    const index = this.instruments.findIndex(p => p._id === _id);
  	let dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { name: this.instruments[index].name, cantidad: this.instruments[index].cantidad }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('The dialog was closed');
        this.instrumentService.updateCantidadInstrument(_id, result);
      }
      //this.cantidadPrestada = result;
      console.log(typeof(result));
      console.log(result);
    });
  }

  ngOnDestroy() {
    this.subsIns.unsubscribe();
  }

}