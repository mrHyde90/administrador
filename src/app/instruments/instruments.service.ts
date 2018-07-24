import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {InstrumentModel} from './instrument.model';
import { environment } from "../../environments/environment";

@Injectable({providedIn: "root"})
export class InstrumentsService {
	private instruments: InstrumentModel[] = [];
	private instrumentsUpdated = new Subject<{instruments: InstrumentModel[], instrumentCount: number}>();
	private contactUrl = environment.apiUrl + "/instruments";
	private maxInstruments = 0;
	constructor(private http: HttpClient){}

	deleteInstrument(instrumentID: string){
		return this.http
			.delete<{message: string}>(`${this.contactUrl}/${instrumentID}`)
	}

	getInstrumentUpdated() {
		return this.instrumentsUpdated.asObservable();
	}

	getInstruments(instrumentsPerPage: number, currentPage: number) {
		const queryParams = `?pageSize=${instrumentsPerPage}&page=${currentPage}`;
		this.http.get<{maxInstruments: number, instruments: InstrumentModel[]}>(`${this.contactUrl}` + queryParams)
		.subscribe(instrumentsData => {
			this.instruments = instrumentsData.instruments;
			this.maxInstruments = instrumentsData.maxInstruments;
			this.instrumentsUpdated.next(
				{instruments: [...this.instruments], 
				instrumentCount: this.maxInstruments});
		});
	}

	getInstrumentsCategories(instrumentsPerPage: number, currentPage: number, categoria: string) {
		const queryParams = `?pageSize=${instrumentsPerPage}&page=${currentPage}&categoria=${categoria}`;
		this.http.get<{maxInstruments: number, instruments: InstrumentModel[]}>(`${this.contactUrl}/categories` + queryParams)
		.subscribe(instrumentsData => {
			this.instruments = instrumentsData.instruments;
			this.maxInstruments = instrumentsData.maxInstruments;
			this.instrumentsUpdated.next(
				{instruments: [...this.instruments],
				instrumentCount: this.maxInstruments});
		});
	}

	updateInstrument(instrument_id:string, newInstrument:InstrumentModel){
		return this.http
			.put<{message: string}>(`${this.contactUrl}/${instrument_id}`, newInstrument);
	}

	createInstrument(newInstrument: InstrumentModel){
		return this.http
			.post<{message: string}>(`${this.contactUrl}`, newInstrument);
	}

	getInstrument(instrument_id: string){
		return this.http
			.get<{instrument: InstrumentModel}>(`${this.contactUrl}/${instrument_id}`);
	}

	//IncreaseInstrument, instrument_id, request_type, cantidad
	increaseInstrument(_id: string, cantidad: number){
		return this.http
			.put<{message: string}>(`${this.contactUrl}/increase/${_id}`, {cantidad: cantidad});
	}

	updateCantidadInstrument(_id: string, cantidad: number){
		return this.http
			.put<{message: string, exito: boolean}>(`${this.contactUrl}/decrease/${_id}`, {cantidad: cantidad});
	}
}