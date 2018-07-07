import { Component, OnInit } from '@angular/core';
import {RequestModel} from '../request/request.model';
import {UserRequestService} from './user-request.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';
import {InstrumentsService} from '../instruments/instruments.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {
  requests: RequestModel[];
  private reqSub: Subscription;
  private userId: string;
  private allRequests = true;
  private request_type = "pending";

  constructor(private userRequestService: UserRequestService,
              private route: ActivatedRoute,
              private instrumentsService: InstrumentsService) { }

  ngOnInit() {
    this.reqSub = this.userRequestService.getRequestsUpdate()
      .subscribe((requestData: {requests: RequestModel[]}) => {
        console.log(requestData.requests);
        this.requests = requestData.requests;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("id")){
        this.userId = paramMap.get("id");
        this.allRequests = false;
      }
    });
  }

  deleteRequest(request_id: string){
    this.userRequestService.deleteRequest(request_id)
      .subscribe(() => {
        if(this.allRequests){
          this.userRequestService.getAllRequests(this.request_type);
        } else {
          this.userRequestService.getUserRequests(this.request_type, this.userId);
        }
      });
  }

  permitir(cantidad: number, instrument_id: string, request_id:string){
    this.instrumentsService
      .updateCantidadInstrument(instrument_id, cantidad)
        .subscribe(instrumentsData => {
          const message = instrumentsData.message;
          const exito = instrumentsData.exito;
          if(exito){
            console.log("Si se pudo actualizar");
            this.updateRequest(request_id);
          } else {
            console.log("No se pudo actualizar, la cantidad que se pide es mayor a la actual");
          }
          console.log(message);
        });
  }

  private updateRequest(request_id: string){
    this.userRequestService.updateRequest(request_id)
      .subscribe(() => {
        if(this.allRequests){
          this.userRequestService.getAllRequests(this.request_type);
        } else {
          this.userRequestService.getUserRequests(this.request_type, this.userId);
        }
      });
  }

  prestamos(){
    this.request_type = "accept";
    if(this.allRequests){
      this.userRequestService.getAllRequests(this.request_type);
    } else {
      this.userRequestService.getUserRequests(this.request_type, this.userId);
    }
  }

  pendientes(){
    this.request_type = "pending";
    if(this.allRequests){
      this.userRequestService.getAllRequests(this.request_type);
    } else {
      this.userRequestService.getUserRequests(this.request_type, this.userId);
    }
  }
}
