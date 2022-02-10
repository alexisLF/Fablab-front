import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaintenanceStatus } from "src/models/maintenance-status.model";
import { MaintenanceStatusService } from "../maintenance-status.service";

@Component({
  selector: "app-maintenance-status-details",
  templateUrl: "./maintenance-status-details.component.html",
  styleUrls: ["./maintenance-status-details.component.css"],
})
export class MaintenanceStatusDetailsComponent implements OnInit {
  maintenanceStatus: MaintenanceStatus;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private maintenanceStatusService: MaintenanceStatusService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getMaintenanceStatus(this.id);
    }
  }

  getMaintenanceStatus(id: number): void {
    this.maintenanceStatusService.findOne(id).subscribe((data) => {
      this.maintenanceStatus = data;
      this.form.controls["name"].setValue(this.maintenanceStatus.name);
      this.isNew = false;
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let maintenanceStatus = new MaintenanceStatus();
      maintenanceStatus.id = this.id;
      maintenanceStatus.name = this.form.controls["name"].value;
      this.maintenanceStatusService
        .update(maintenanceStatus.id, maintenanceStatus)
        .subscribe((data) => {
          this.router.navigateByUrl("/maintenancestatus");
        });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let maintenanceStatus = new MaintenanceStatus();
      maintenanceStatus.name = this.form.controls["name"].value;
      this.maintenanceStatusService
        .save(maintenanceStatus)
        .subscribe((data) => {
          this.router.navigateByUrl("/maintenancestatus");
        });
    } else {
      this.formSubmitted = false;
    }
  }
}
