import { Injectable } from '@angular/core';
import {RequestModel} from '../request/request.model';
import { HttpClient} from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
	private requests: RequestModel[];
	private requestsUpdate = new Subject<{requests: RequestModel[]}>();
	private baseUrl = `http://localhost:3000/api/request`;

  constructor(private http: HttpClient) { }

  getRequestsUpdate() {
  	return this.requestsUpdate.asObservable();
  }

  getUserRequests(request_type: string, userId: string){
  	const queryParams = `?request_type=${request_type}`;
    this.http
      .get<{sendRequests: RequestModel[]}>(`${this.baseUrl}/search-user-requests/${userId}${queryParams}`)
      .subscribe(requestData => {
        this.requests = requestData.sendRequests;
        this.requestsUpdate.next({requests: [...this.requests]});
      });
  }

  getAllRequests(request_type: string){
    const queryParams = `?request_type=${request_type}`;
    this.http
      .get<{sendRequests: RequestModel[]}>(`${this.baseUrl}/search-all-requests${queryParams}`)
      .subscribe(requestData => {
        this.requests = requestData.sendRequests;
        this.requestsUpdate.next({requests: [...this.requests]});
      });
  }

  deleteRequest(request_id: string){
    return this.http
      .delete(`${this.baseUrl}/${request_id}`)
  }

  updateRequest(request_id: string){
    return this.http.put(`${this.baseUrl}/${request_id}`, {request_type: "accept"});
  }

}
