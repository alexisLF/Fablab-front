import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Maintenance } from "src/models/maintenance.model";
import { MaintenanceService } from "../maintenance.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-maintenance-list",
  templateUrl: "./maintenance-list.component.html",
  styleUrls: ["./maintenance-list.component.css"],
})
export class MaintenanceListComponent implements OnInit {
  maintenances: Maintenance[];
  searchText = "";
  page: number;
  nbPage;
  nbMaintenances: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countMaintenances();
    this.getMaintenances();
  }

  getMaintenances(): void {
    this.maintenanceService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.maintenances = data;
      });
  }

  countMaintenances() {
    this.maintenanceService.count().subscribe((data) => {
      this.nbMaintenances = data;
      this.nbPage = Math.ceil(this.nbMaintenances / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/maintenances-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/maintenances-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.maintenanceService.delete(id).subscribe((_) => this.getMaintenances());
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer cette maintenance ?",
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
      this.getMaintenances();
    }
  }
  next() {
    if (this.nbMaintenances / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getMaintenances();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getMaintenances();
  }
}
