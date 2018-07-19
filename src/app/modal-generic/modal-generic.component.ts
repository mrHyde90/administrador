import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  templateUrl: "./modal-generic.component.html",
  selector: "app-modal-generic",
  // styleUrls: ["./error.component.css"]
})
export class ModalGenericComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
  
}