import { Injectable } from '@angular/core';
import {RequestModel} from '../request/request.model';
import { HttpClient} from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
	private requests: RequestModel[];
	private requestsUpdate = new Subject<{requests: RequestModel[], requestCount: number}>();
	private baseUrl = `http://localhost:3000/api/request`;
  private maxRequests = 0;

  constructor(private http: HttpClient) { }

  getRequestsUpdate() {
  	return this.requestsUpdate.asObservable();
  }

  getUserRequests(request_type: string, userId: string, requestPerPage: number, currentPage: number){
  	const queryParams = `?request_type=${request_type}&pageSize=${requestPerPage}&page=${currentPage}`;
    this.http
      .get<{maxRequests: number, sendRequests: RequestModel[]}>(`${this.baseUrl}/search-user-requests/${userId}${queryParams}`)
      .subscribe(requestData => {
        this.requests = requestData.sendRequests;
        this.maxRequests = requestData.maxRequests;
        this.requestsUpdate.next({requests: [...this.requests], requestCount: this.maxRequests});
      });
  }

  getAllRequests(request_type: string, requestPerPage: number, currentPage: number){
    const queryParams = `?request_type=${request_type}&pageSize=${requestPerPage}&page=${currentPage}`;
    this.http
      .get<{maxRequests: number, sendRequests: RequestModel[]}>(`${this.baseUrl}/search-all-requests${queryParams}`)
      .subscribe(requestData => {
        this.requests = requestData.sendRequests;
        this.maxRequests = requestData.maxRequests;
        this.requestsUpdate.next({requests: [...this.requests], requestCount: this.maxRequests});
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
