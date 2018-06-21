import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {InstrumentModel} from '../instrument.model';
import {ModalComponent} from '../../modal/modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatPaginator} from '@angular/material';
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
  totalInstruments = 0;
  instrumentsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  isLoading = false;
  currentPage = 1;
	instruments:InstrumentModel[] = [];
  @ViewChild("lola") mdPaginator: MatPaginator;


  constructor(public dialog: MatDialog, 
              private instrumentService: InstrumentsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Inicio");
    this.subsIns = this.instrumentService.getInstrumentUpdated()
      .subscribe((instrumentData: {instruments: InstrumentModel[], instrumentCount: number}) => {
        this.isLoading = false;
        this.totalInstruments = instrumentData.instrumentCount;
        this.instruments = instrumentData.instruments;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.mdPaginator.firstPage();
      this.isLoading = true;
      if(paramMap.has("type")){
        this.type = paramMap.get("type");
        this.instrumentService.getInstrumentsCategories(this.instrumentsPerPage, this.currentPage, this.type);
      } else {
        this.type = null;
        this.instrumentService.getInstruments(this.instrumentsPerPage, this.currentPage);
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
        this.isLoading = true;
        this.instrumentService.updateCantidadInstrument(_id, result);
      }
      //this.cantidadPrestada = result;
      console.log(typeof(result));
      console.log(result);
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.instrumentsPerPage = pageData.pageSize;
    if(this.type){
      this.instrumentService.getInstrumentsCategories(this.instrumentsPerPage, this.currentPage, this.type);
    } else {
      this.instrumentService.getInstruments(this.instrumentsPerPage, this.currentPage);
    }
  }

  ngOnDestroy() {
    this.subsIns.unsubscribe();
  }

}