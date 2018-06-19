import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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

	getInstrumentsCategories(categoria: string) {
		const options = categoria ? 
			{params: new HttpParams().set("categoria", categoria)} : {};
		this.http.get<InstrumentModel[]>(`http://localhost:3000${this.contactUrl}/categories`, options)
		.subscribe(instrumentsData => {
			this.instruments = instrumentsData;
			this.instrumentsUpdated.next([...this.instruments]);
		});
	}

	updateCantidadInstrument(_id: string, cantidad: number){
		this.http.put(`http://localhost:3000${this.contactUrl}/${_id}`, {cantidad: cantidad})
			.subscribe(response => {
				const nuevaR: any = response;
				if(nuevaR.exito){
					console.log(nuevaR.message);
					const updateInstrument = [...this.instruments];
					const index = updateInstrument.findIndex(p => p._id === _id);
					const nuevaCantidad = updateInstrument[index].cantidad - cantidad;
					updateInstrument[index].cantidad = nuevaCantidad;
					this.instruments = updateInstrument;
					this.instrumentsUpdated.next([...this.instruments]);
				} else {
					console.log(nuevaR.message);
				}
			});
	}
}