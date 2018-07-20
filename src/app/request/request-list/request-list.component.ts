import { Component, OnInit } from '@angular/core';
import {RequestModel} from '../request.model';
import {RequestService} from '../request.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
	requests: RequestModel[];
  allow_delete = false;
  isLoading = false;
  private reqSub: Subscription;
  private type_request: string;

  constructor(private requestService: RequestService,
  				private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.reqSub = this.requestService.getRequestsUpdate()
      .subscribe((requestData: {requests: RequestModel[]}) => {
        this.requests = requestData.requests;
        this.isLoading = false;
      });

  	this.route.paramMap.subscribe((paramMap: ParamMap) => {
  		const type_request = paramMap.get("request_type");
      this.type_request = type_request;
      if(type_request === "pending"){
        this.allow_delete = true;
      } else {
        this.allow_delete = false;
      }
  		this.requestService.getRequests(type_request);
  	});
  }

  deleteRequest(request_id: string){
    this.isLoading = true;
    console.log(request_id);
    this.requestService.deleteRequest(request_id)
      .subscribe(() => {
        this.isLoading = false;
        this.requestService.getRequests(this.type_request);
      }, error => {
        this.isLoading = false;
      });
  }

}
