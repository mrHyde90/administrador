import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {InstrumentModel} from './instrument.model';

@Injectable({providedIn: "root"})
export class InstrumentsService {
	private instruments: InstrumentModel[] = [];
	private instrumentsUpdated = new Subject<InstrumentModel[]>();
	private contactUrl = "/api/instruments";

	constructor(private http: HttpClient){}

	getInstrumentUpdated() {
		return this.instrumentsUpdated.asObservable();
	}

	getInstruments() {
		this.http.get<InstrumentModel[]>(`http://localhost:3000${this.contactUrl}`)
		.subscribe(instrumentsData => {
			this.instruments = instrumentsData;
			this.instrumentsUpdated.next([...this.instruments]);
		});
	}

	updateCantidadInstrument(_id: string, cantidad: number){
		const updateInstrument = [...this.instruments];
		const index = updateInstrument.findIndex(p => p._id === _id);
		const nuevaCantidad = updateInstrument[index].cantidad - cantidad;
		updateInstrument[index].cantidad = nuevaCantidad;
		this.instruments = updateInstrument;
		this.instrumentsUpdated.next([...this.instruments]);
	}
}