import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { SecurityGear } from "src/models/security-gear.model";
import { SecurityGearService } from "../security-gear.service";

@Component({
  selector: "app-security-gear-list",
  templateUrl: "./security-gear-list.component.html",
  styleUrls: ["./security-gear-list.component.css"],
})
export class SecurityGearListComponent implements OnInit {
  securityGears: SecurityGear[];
  searchText = "";
  page: number;
  nbPage;
  nbSecurityGear: number;
  /** Variable to define the number of entities by page */
  public pageSize: number = 5;

  constructor(
    private router: Router,
    private securityGearService: SecurityGearService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.page = 0;
    this.countSecurityGears();
    this.getSecurityGears();
  }

  getSecurityGears(): void {
    this.securityGearService
      .findAllFilter(this.searchText, this.page, Number(this.pageSize))
      .subscribe((data) => {
        if(data.length == 0){
          if(this.nbPage > 1) this.nbPage --;
          this.previous()
        }
        this.securityGears = data;
      });
  }

  countSecurityGears() {
    this.securityGearService.count().subscribe((data) => {
      this.nbSecurityGear = data;
      this.nbPage = Math.ceil(this.nbSecurityGear / Number(this.pageSize));
    });
  }

  add(): void {
    this.router.navigateByUrl("/securitygears-details");
  }

  update(id: number): void {
    this.router.navigateByUrl("/securitygears-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.securityGearService
      .delete(id)
      .subscribe((_) => this.getSecurityGears());
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer cet équipement de sécurité ?",
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
      this.getSecurityGears();
    }
  }
  next() {
    if (this.nbSecurityGear / Number(this.pageSize) - 1 > this.page) {
      this.page++;
      this.getSecurityGears();
    }
  }
  changeValue(value: any) {
    this.pageSize = value;
    this.getSecurityGears();
  }
}
