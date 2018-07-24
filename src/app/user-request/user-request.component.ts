import { Component, OnInit } from '@angular/core';
import {RequestModel} from '../request/request.model';
import {UserRequestService} from './user-request.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';
import {InstrumentsService} from '../instruments/instruments.service';
import { PageEvent} from '@angular/material';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {
  requests: RequestModel[] = [];
  private reqSub: Subscription;
  private userId: string;
  private allRequests = true;
  private request_type = "pending";
  totalRequests = 0;
  requestsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  isLoading = false;
  currentPage = 1;

  constructor(private userRequestService: UserRequestService,
              private route: ActivatedRoute,
              private instrumentsService: InstrumentsService) { }

  ngOnInit() {
    this.reqSub = this.userRequestService.getRequestsUpdate()
      .subscribe((requestData: {requests: RequestModel[], requestCount: number}) => {
        this.isLoading = false;
        this.requests = requestData.requests;
        this.totalRequests = requestData.requestCount;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("id")){
        this.userId = paramMap.get("id");
        this.allRequests = false;
      }
    });
  }

  updateFrontPage(){
    if(this.allRequests){
      this.userRequestService.getAllRequests(this.request_type, this.requestsPerPage, this.currentPage);
    } else {
      this.userRequestService.getUserRequests(this.request_type, this.userId, this.requestsPerPage, this.currentPage);
    }
  }

  isPending(){
    return this.request_type === "pending";
  }

  deleteRequest(request_id: string, instrument_id: string, cantidad: number){
    this.isLoading = true;
    this.userRequestService.deleteRequest(request_id)
      .subscribe(() => {
        if(this.request_type === "accept"){
          this.instrumentsService.increaseInstrument(instrument_id, cantidad)
            .subscribe(response => {
              this.updateFrontPage();
            }, error => {
              this.isLoading = false;
            });
        } else {
          this.updateFrontPage();
        }
      }, error => {
        this.isLoading = false;
      });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.requestsPerPage = pageData.pageSize;
    this.updateFrontPage();
  }

  permitir(cantidad: number, instrument_id: string, request_id:string){
    if(this.request_type === "accept"){
      return;
    }
    this.isLoading = true;
    this.instrumentsService
      .updateCantidadInstrument(instrument_id, cantidad)
        .subscribe(instrumentsData => {
          this.isLoading = false;
          const message = instrumentsData.message;
          const exito = instrumentsData.exito;
          if(exito){
            this.userRequestService.updateRequest(request_id)
              .subscribe(() => {
                this.updateFrontPage();
              });
          } 
        }, error => {
          this.isLoading = false;
        });
  }

  prestamos(){
    this.request_type = "accept";
    this.updateFrontPage();
  }

  pendientes(){
    this.request_type = "pending";
    this.updateFrontPage();
  }
}
