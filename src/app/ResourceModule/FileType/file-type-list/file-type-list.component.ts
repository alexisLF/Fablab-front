import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";

import { MatDialog } from "@angular/material/dialog";
import { TypeFile } from "src/models/type-file.model";
import { FileTypeService } from "../file-type.service";

@Component({
  selector: "app-file-type-list",
  templateUrl: "./file-type-list.component.html",
  styleUrls: ["./file-type-list.component.css"],
})
export class FileTypeListComponent implements OnInit {
  fileTypes: TypeFile[];
  searchText = "";
  page: number;
  nbPage;
  nbfileTypes: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private fileTypeService: FileTypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countFileTypes();
    this.getFileTypes();
  }

  getFileTypes(): void {
    this.fileTypeService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.fileTypes = data;
      });
  }

  countFileTypes() {
    this.fileTypeService.count().subscribe((data) => {
      this.nbfileTypes = data;
      this.nbPage = Math.ceil(this.nbfileTypes / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/filetypes-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/filetypes-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.fileTypeService.delete(id).subscribe((data) => this.getFileTypes());
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer ce type de fichier ?",
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
      this.getFileTypes();
    }
  }
  next() {
    if (this.nbfileTypes / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getFileTypes();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getFileTypes();
  }
}
