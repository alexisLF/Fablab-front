import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MaintenanceStatus } from "src/models/maintenance-status.model";
import { MaintenanceStatusService } from "../maintenance-status.service";

@Component({
  selector: "app-maintenance-status-list",
  templateUrl: "./maintenance-status-list.component.html",
  styleUrls: ["./maintenance-status-list.component.css"],
})
export class MaintenanceStatusListComponent implements OnInit {
  maintenanceStatus: MaintenanceStatus[];
  searchText = "";
  page: number;
  nbPage;
  nbMaintenanceStatus: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private maintenanceStatusService: MaintenanceStatusService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countMaintenanceStatus();
    this.getAllMaintenanceStatus();
  }

  getAllMaintenanceStatus(): void {
    this.maintenanceStatusService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.maintenanceStatus = data;
      });
  }

  countMaintenanceStatus() {
    this.maintenanceStatusService.count().subscribe((data) => {
      this.nbMaintenanceStatus = data;
      this.nbPage = Math.ceil(this.nbMaintenanceStatus / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/maintenancestatus-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/maintenancestatus-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.maintenanceStatusService
      .delete(id)
      .subscribe((data) => this.getAllMaintenanceStatus());
  }

  previous() {
    if (this.page > 0) {
      this.page--;
      this.getAllMaintenanceStatus();
    }
  }
  next() {
    if (this.nbMaintenanceStatus / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getAllMaintenanceStatus();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getAllMaintenanceStatus();
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer ce statut de maintenance ?",
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
}
