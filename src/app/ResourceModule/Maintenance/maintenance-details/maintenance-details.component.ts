import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaintenanceStatus } from "src/models/maintenance-status.model";
import { Maintenance } from "src/models/maintenance.model";
import { Resource } from "src/models/resource.model";
import { TypeOperation } from "src/models/type-operation.model";
import { MaintenanceStatusService } from "../../MaintenanceStatus/maintenance-status.service";
import { OperationTypeService } from "../../OperationType/operation-type.service";
import { ResourceService } from "../../Resource/resource.service";
import { MaintenanceService } from "../maintenance.service";

@Component({
  selector: "app-maintenance-details",
  templateUrl: "./maintenance-details.component.html",
  styleUrls: ["./maintenance-details.component.css"],
})
export class MaintenanceDetailsComponent implements OnInit {
  maintenance: Maintenance;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;
  maintenancesStatus: MaintenanceStatus[];
  filteredListMaintenanceStatus;
  operationTypes: TypeOperation[];
  filteredListOperationType;
  resources: Resource[];
  filteredListResource;
  successCases: string[] = ["N/A", "Oui", "Non"];
  itemResource: MaintenanceStatus;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private maintenanceStatusService: MaintenanceStatusService,
    private operationTypeService: OperationTypeService,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      //name: ["", Validators.compose([Validators.required])],
      note: ["", Validators.compose([Validators.required])],
      operationType: ["", Validators.compose([Validators.required])],
      maintenanceStatus: ["", Validators.compose([Validators.required])],
      resource: ["", Validators.compose([Validators.required])],
      dateStart: [new Date(), Validators.compose([Validators.required])],
      dateEnd: [new Date()],
      isSuccess: ["", Validators.compose([Validators.required])],
    });

    this.maintenanceStatusService.getAll().subscribe((data) => {
      this.maintenancesStatus = data;
      this.filteredListMaintenanceStatus = this.maintenancesStatus.slice();
    });

    this.operationTypeService.getAll().subscribe((data) => {
      this.operationTypes = data;
      this.filteredListOperationType = this.operationTypes.slice();
    });

    this.resourceService.getAll().subscribe((data) => {
      this.resources = data;
      this.filteredListResource = this.resources.slice();
    });

    if (this.id != undefined) {
      this.getMaintenance(this.id);
    }
  }

  getMaintenance(id: number): void {
    this.maintenanceService.findOne(id).subscribe((data) => {
      this.maintenance = data;
      this.isNew = false;
      this.form.controls["dateStart"].setValue(this.maintenance.dateStart);
      this.form.controls["dateEnd"].setValue(this.maintenance.dateEnd);
      this.form.controls["note"].setValue(this.maintenance.note);
      if (this.maintenance.success != null)
        this.form.controls["isSuccess"].setValue(this.maintenance.success);
      else this.form.controls["isSuccess"].setValue("N/A");
      this.maintenancesStatus.forEach((status) => {
        if (this.maintenance.status.id == status.id) {
          this.form.controls["maintenanceStatus"].setValue(status);
        }
      });
      this.operationTypes.forEach((type) => {
        if (this.maintenance.type.id == type.id) {
          this.form.controls["operationType"].setValue(type);
        }
      });
      this.resources.forEach((resource) => {
        if (this.maintenance.resource.id == resource.id) {
          this.form.controls["resource"].setValue(resource);
        }
      });
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let maintenance = new Maintenance();
      maintenance.id = this.id;
      maintenance.note = this.form.controls["note"].value;
      maintenance.type = this.form.controls["operationType"].value;
      maintenance.status = this.form.controls["maintenanceStatus"].value;
      maintenance.resource = this.form.controls["resource"].value;
      maintenance.dateStart = this.form.controls["dateStart"].value;
      maintenance.dateEnd = this.form.controls["dateEnd"].value;
      if (this.form.controls["isSuccess"].value == "N/A")
        maintenance.success = null;
      else maintenance.success = this.form.controls["isSuccess"].value;
      this.maintenanceService
        .update(maintenance.id, maintenance)
        .subscribe((data) => {
          this.router.navigateByUrl("/maintenances");
        });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      let maintenance = new Maintenance();
      maintenance.note = this.form.controls["note"].value;
      maintenance.type = this.form.controls["operationType"].value;
      maintenance.status = this.form.controls["maintenanceStatus"].value;
      maintenance.resource = this.form.controls["resource"].value;
      maintenance.dateStart = this.form.controls["dateStart"].value;
      maintenance.dateEnd = this.form.controls["dateEnd"].value;
      if (this.form.controls["isSuccess"].value == "N/A")
        maintenance.success = null;
      else maintenance.success = this.form.controls["isSuccess"].value;
      this.maintenanceService.save(maintenance).subscribe((data) => {
        this.router.navigateByUrl("/maintenances");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
