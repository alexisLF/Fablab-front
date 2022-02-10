import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DeliveryStatus } from "src/models/delivery-status.model";
import { DeliveryStatusService } from "../delivery-status.service";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-delivery-status-list",
  templateUrl: "./delivery-status-list.component.html",
  styleUrls: ["./delivery-status-list.component.css"],
})
export class DeliveryStatusListComponent implements OnInit {
  deliveryStatus: DeliveryStatus[];
  searchText = "";
  page: number;
  nbPage;
  nbdeliveryStatus: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private deliveryStatusService: DeliveryStatusService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countDeliveryStatus();
    this.getAllDeliveryStatus();
  }

  getAllDeliveryStatus(): void {
    this.deliveryStatusService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.deliveryStatus = data;
      });
  }

  countDeliveryStatus() {
    this.deliveryStatusService.count().subscribe((data) => {
      this.nbdeliveryStatus = data;
      this.nbPage = Math.ceil(this.nbdeliveryStatus / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/deliverystatus-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/deliverystatus-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.deliveryStatusService
      .delete(id)
      .subscribe((_) => this.getAllDeliveryStatus());
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer ce statut de livraison ?",
        buttonText: {
          ok: "Oui",
          cancel: "Non",
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(id);
      }
    });
  }

  previous() {
    if (this.page > 0) {
      this.page--;
      this.getAllDeliveryStatus();
    }
  }
  next() {
    if (this.nbdeliveryStatus / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getAllDeliveryStatus();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getAllDeliveryStatus();
  }
}
