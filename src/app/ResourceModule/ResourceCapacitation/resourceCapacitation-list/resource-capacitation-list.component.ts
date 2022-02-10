import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Capacitation } from "src/models/capacitation.model";
import { CapacitationService } from "../resource-capacitation.service";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-resource-capacitation-list",
  templateUrl: "./resource-capacitation-list.component.html",
  styleUrls: ["./resource-capacitation-list.component.css"],
})
export class ResourceCapacitationListComponent implements OnInit {
  capacitations: Capacitation[];
  searchText = "";
  page: number;
  nbPage;
  nbCapacitations: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private capacitationService: CapacitationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countCapacitations();
    this.getCapacitations();
  }

  getCapacitations(): void {
    this.capacitationService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.capacitations = data;
      });
  }

  countCapacitations() {
    this.capacitationService.count().subscribe((data) => {
      this.nbCapacitations = data;
      this.nbPage = Math.ceil(this.nbCapacitations / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/resourcecapacitations-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/resourcecapacitations-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.capacitationService
      .delete(id)
      .subscribe((data) => this.getCapacitations());
  }

  previous() {
    if (this.page > 0) {
      this.page--;
      this.getCapacitations();
    }
  }
  next() {
    if (this.nbCapacitations / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getCapacitations();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getCapacitations();
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer cette habilitation ?",
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
