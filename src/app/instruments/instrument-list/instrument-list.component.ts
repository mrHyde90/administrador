import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {InstrumentModel} from '../instrument.model';
import {ModalComponent} from '../../modal/modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs';
import {InstrumentsService} from '../instruments.service';
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent implements OnInit, OnDestroy {
  private subsIns: Subscription;
  private type: string;
  isLoading = false;
	
	instruments:InstrumentModel[] = [];

  constructor(public dialog: MatDialog, 
              private instrumentService: InstrumentsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Inicio");
    this.subsIns = this.instrumentService.getInstrumentUpdated()
      .subscribe((instruments: InstrumentModel[]) => {
        this.isLoading = false;
        this.instruments = instruments;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.isLoading = true;
      if(paramMap.has("type")){
        this.type = paramMap.get("type");
        this.instrumentService.getInstrumentsCategories(this.type);
      } else {
        this.instrumentService.getInstruments();
      }
    });
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
        this.isLoading = true;
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