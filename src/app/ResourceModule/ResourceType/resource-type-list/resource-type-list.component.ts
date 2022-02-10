import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { TypeResource } from "src/models/type-resource.model";
import { ResourceTypeService } from "../resource-type.service";

@Component({
  selector: "app-resource-type-list",
  templateUrl: "./resource-type-list.component.html",
  styleUrls: ["./resource-type-list.component.css"],
})
export class ResourceTypeListComponent implements OnInit {
  resourceTypes: TypeResource[];
  searchText = "";
  page: number;
  nbPage;
  nbResourceType: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private resourceTypeService: ResourceTypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countResourcetypes();
    this.getResourceType();
  }

  getResourceType(): void {
    this.resourceTypeService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.resourceTypes = data;
      });
  }

  countResourcetypes() {
    this.resourceTypeService.count().subscribe((data) => {
      this.nbResourceType = data;
      this.nbPage = Math.ceil(this.nbResourceType / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/resourcetypes-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/resourcetypes-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.resourceTypeService
      .delete(id)
      .subscribe((data) => this.getResourceType());
  }

  previous() {
    if (this.page > 0) {
      this.page--;
      this.getResourceType();
    }
  }
  next() {
    if (this.nbResourceType / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getResourceType();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getResourceType();
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer ce type de ressoure ?",
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
