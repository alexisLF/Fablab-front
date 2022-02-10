import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { MaintenanceStatus } from "src/models/maintenance-status.model";
import { MatDialog } from "@angular/material/dialog";
import { Purchase } from "src/models/purchase.model";
import { PurchaseService } from "../purchase.service";

@Component({
  selector: "app-purchase-list",
  templateUrl: "./purchase-list.component.html",
  styleUrls: ["./purchase-list.component.css"],
})
export class PurchaseListComponent implements OnInit {
  purchases: Purchase[];
  searchText = "";
  page: number;
  nbPage;
  nbPurchase: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private purchaseService: PurchaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countPurchases();
    this.getAllPurchases();
  }

  getAllPurchases(): void {
    this.purchaseService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.purchases = data;
      });
  }

  countPurchases() {
    this.purchaseService.count().subscribe((data) => {
      this.nbPurchase = data;
      this.nbPage = Math.ceil(this.nbPurchase / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/purchases-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/purchases-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.purchaseService.delete(id).subscribe((_) => this.getAllPurchases());
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer cet achat ?",
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
      this.getAllPurchases();
    }
  }
  next() {
    if (this.nbPurchase / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getAllPurchases();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getAllPurchases();
  }
}
