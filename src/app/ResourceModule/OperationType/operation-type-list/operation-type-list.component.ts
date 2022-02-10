import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TypeOperation } from "src/models/type-operation.model";
import { OperationTypeService } from "../operation-type.service";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-operation-type-list",
  templateUrl: "./operation-type-list.component.html",
  styleUrls: ["./operation-type-list.component.css"],
})
export class OperationTypeListComponent implements OnInit {
  operationTypes: TypeOperation[];
  searchText = "";
  page: number;
  nbPage;
  nbOperationTypes: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private operationTypeService: OperationTypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countOperationTypes();
    this.getOperationTypes();
  }

  getOperationTypes(): void {
    this.operationTypeService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.operationTypes = data;
      });
  }

  countOperationTypes() {
    this.operationTypeService.count().subscribe((data) => {
      this.nbOperationTypes = data;
      this.nbPage = Math.ceil(this.nbOperationTypes / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/operationtypes-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/operationtypes-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.operationTypeService
      .delete(id)
      .subscribe((data) => this.getOperationTypes());
  }

  previous() {
    if (this.page > 0) {
      this.page--;
      this.getOperationTypes();
    }
  }
  next() {
    if (this.nbOperationTypes / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getOperationTypes();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getOperationTypes();
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer ce type d'opération ?",
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
