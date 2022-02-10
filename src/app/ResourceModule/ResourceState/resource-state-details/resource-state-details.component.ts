import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaintenanceStatus } from "src/models/maintenance-status.model";
import { ResourceState } from "src/models/resource-state.model";
import { ResourceStateService } from "../resource-state.service";

@Component({
  selector: "app-resource-state-details",
  templateUrl: "./resource-state-details.component.html",
  styleUrls: ["./resource-state-details.component.css"],
})
export class ResourceStateDetailsComponent implements OnInit {
  resourceState: ResourceState;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private resourceStateService: ResourceStateService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getResourceState(this.id);
    }
  }

  getResourceState(id: number): void {
    this.resourceStateService.findOne(id).subscribe((data) => {
      this.resourceState = data;
      this.form.controls["name"].setValue(this.resourceState.name);
      this.isNew = false;
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let resourceState = new ResourceState();
      resourceState.id = this.id;
      resourceState.name = this.form.controls["name"].value;
      this.resourceStateService
        .update(resourceState.id, resourceState)
        .subscribe((data) => {
          this.router.navigateByUrl("/resourcestate");
        });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let resourceState = new ResourceState();
      resourceState.name = this.form.controls["name"].value;
      this.resourceStateService.save(resourceState).subscribe((data) => {
        this.router.navigateByUrl("/resourcestate");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
