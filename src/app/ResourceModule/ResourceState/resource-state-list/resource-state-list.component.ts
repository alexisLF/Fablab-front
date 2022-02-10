import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { InfoService } from "src/app/shared/info/info.service";
import { ResourceState } from "src/models/resource-state.model";
import { ResourceStateService } from "../resource-state.service";

@Component({
  selector: "app-resource-state-list",
  templateUrl: "./resource-state-list.component.html",
  styleUrls: ["./resource-state-list.component.css"],
})
export class ResourceStateListComponent implements OnInit {
  resourceState: ResourceState[];
  searchText = "";
  page: number;
  nbPage;
  nbResourceState: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private resourceStateService: ResourceStateService,
    private dialog: MatDialog,
    private infoService: InfoService
  ) {}

  ngOnInit() {
    this.page = 0;
    
    this.countResourceStates();
    this.getAllResourceState();
  }

  getAllResourceState(): void {
    this.resourceStateService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.resourceState = data;
      });
  }

  countResourceStates() {
    this.resourceStateService.count().subscribe((data) => {
      this.nbResourceState = data;
      this.nbPage = Math.ceil(this.nbResourceState / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/resourcestate-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/resourcestate-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.resourceStateService.delete(id).subscribe((data) => {
      this.getAllResourceState();
    });
  }

  previous() {
    if (this.page > 0) {
      this.page--;
      this.getAllResourceState();
    }
  }
  next() {
    if (this.nbResourceState / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getAllResourceState();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getAllResourceState();
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer cet état de ressource?",
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
