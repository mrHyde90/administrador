import { Injectable } from '@angular/core';
import {RequestModel} from './request.model';
import { HttpClient} from "@angular/common/http";
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RequestService {
	private requests: RequestModel[];
	private requestsUpdate = new Subject<{requests: RequestModel[]}>();
	baseUrl = "/api/request";

  constructor(private http: HttpClient) { }

  getRequestsUpdate() {
  	return this.requestsUpdate.asObservable();
  }

  getRequests(request_type: string){
  	const queryParams = `?request_type=${request_type}`;
  	this.http
  		.get<{sendRequests: RequestModel[]}>(`http://localhost:3000${this.baseUrl}` + queryParams)
  		.subscribe(requestData => {
  			this.requests = requestData.sendRequests;
  			this.requestsUpdate.next({requests: [...this.requests]});
  		});
  }

  createRequest(instrumentName: string, cantidad: number, instrument_id: string){
  	const newRequest: any = {
  		instrumentName: instrumentName, 
  		cantidad: cantidad, 
  		instrument_id: instrument_id
  	};
  	return this.http
  		.post<{message: string}>(`http://localhost:3000${this.baseUrl}`, newRequest);
  }

  deleteRequest(request_id: string){
    return this.http
      .delete(`http://localhost:3000${this.baseUrl}/${request_id}`)
  }

  getRequest(request_type: string){
  	const filterArray = this.requests.filter(request => request.request_type === request_type);
  	return filterArray;
  }
}
