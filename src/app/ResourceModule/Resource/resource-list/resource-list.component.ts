import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { InfoService } from "src/app/shared/info/info.service";
import { MatDialog } from "@angular/material/dialog";
import { Resource } from "src/models/resource.model";
import { ResourceService } from "../resource.service";

@Component({
  selector: "app-resource-list",
  templateUrl: "./resource-list.component.html",
  styleUrls: ["./resource-list.component.css"],
})
export class ResourceListComponent implements OnInit {
  resources: Resource[];
  id: number;
  role:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private infoService: InfoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id != null) this.getAllResources();
    this.role = localStorage.getItem("role")
  }

  getAllResources(): void {
    this.resourceService.getResourcesByType(this.id).subscribe((data) => {
      this.resources = data;
    });
  }

  add(): void {
    this.router.navigateByUrl("/resources-details?typeId=" + this.id);
  }

  update(id: number): void {
    this.router.navigateByUrl("/resources-details?id=" + id);
  }

  delete(id: number): void {
    //mettre message d'alerte avec un êtes vous sure de vouloir supprimer ?
    this.resourceService.delete(id).subscribe((_) => this.refresh());
  }

  deleteConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        id: id,
        type: "other",
        message: "Etes vous sur de vouloir supprimer cette ressource ?",
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

  sendOutOfStockWarning(id: number): void {
    const options = {
      title: "Alerte de fin de stock",
      message: "Un mail a été envoyé !",
    };

    this.infoService.open(options);
  }

  refresh() {
    this.getAllResources();
  }
}
