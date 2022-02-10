import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { Documentation } from "src/models/documentation.model";
import { DocumentationService } from "../documentation.service";

@Component({
  selector: "app-documentation-list",
  templateUrl: "./documentation-list.component.html",
  styleUrls: ["./documentation-list.component.css"],
})
export class DocumentationListComponent implements OnInit {
  documentations: Documentation[];
  searchText = "";
  page: number;
  nbPage;
  nbDocumentation: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private documentationService: DocumentationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countDocumentations();
    this.getDocumentations();
  }

  getDocumentations(): void {
    this.documentationService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.documentations = data;
      });
  }

  countDocumentations() {
    this.documentationService.count().subscribe((data) => {
      this.nbDocumentation = data;
      this.nbPage = Math.ceil(this.nbDocumentation / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/documentations-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/documentations-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.documentationService
      .delete(id)
      .subscribe((_) => this.getDocumentations());
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer cette documentation ?",
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
      this.getDocumentations();
    }
  }
  next() {
    if (this.nbDocumentation / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getDocumentations();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getDocumentations();
  }
}
