import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Capacitation } from "src/models/capacitation.model";
import { CapacitationService } from "../resource-capacitation.service";

@Component({
  selector: "app-resource-capacitation-details",
  templateUrl: "./resource-capacitation-details.component.html",
  styleUrls: ["./resource-capacitation-details.component.css"],
})
export class ResourceCapacitationDetailsComponent implements OnInit {
  capacitation: Capacitation;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private capacitationService: CapacitationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getCapacitation(this.id);
    }
  }

  getCapacitation(id: number): void {
    this.capacitationService.findOne(id).subscribe((data) => {
      this.capacitation = data;
      this.form.controls["name"].setValue(this.capacitation.name);
      this.form.controls["description"].setValue(this.capacitation.description);
      this.isNew = false;
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let capacitation = new Capacitation();
      capacitation.id = this.id;
      capacitation.name = this.form.controls["name"].value;
      capacitation.description = this.form.controls["description"].value;
      this.capacitationService
        .update(capacitation.id, capacitation)
        .subscribe((data) => {
          this.router.navigateByUrl("/resourcecapacitations");
        });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let capacitation = new Capacitation();
      capacitation.name = this.form.controls["name"].value;
      capacitation.description = this.form.controls["description"].value;
      this.capacitationService.save(capacitation).subscribe((data) => {
        this.router.navigateByUrl("/resourcecapacitations");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
