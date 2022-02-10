import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Site } from "src/models/site.model";
import { SiteService } from "../site.service";

@Component({
  selector: "app-site-list",
  templateUrl: "./site-list.component.html",
  styleUrls: ["./site-list.component.css"],
})
export class SiteListComponent implements OnInit {
  sites: Site[];
  searchText = "";
  page: number;
  nbPage;
  nbSites: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private siteService: SiteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    this.countSites();
    this.getSites();
  }

  getSites(): void {
    this.siteService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.sites = data;
      });
  }

  countSites() {
    this.siteService.count().subscribe((data) => {
      this.nbSites = data;
      this.nbPage = Math.ceil(this.nbSites / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/sites-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/sites-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.siteService.delete(id).subscribe((data) => this.getSites());
  }

  previous() {
    if (this.page > 0) {
      this.page--;
      this.getSites();
    }
  }
  next() {
    if (this.nbSites / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getSites();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getSites();
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer ce site ?",
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
