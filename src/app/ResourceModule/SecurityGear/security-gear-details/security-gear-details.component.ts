import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SecurityGear } from "src/models/security-gear.model";
import { TypeResource } from "src/models/type-resource.model";
import { SecurityGearService } from "../security-gear.service";

@Component({
  selector: "app-security-gear-details",
  templateUrl: "./security-gear-details.component.html",
  styleUrls: ["./security-gear-details.component.css"],
})
export class SecurityGearDetailsComponent implements OnInit {
  securityGear: SecurityGear;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private securityGearService: SecurityGearService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getSecurityGear(this.id);
    }
  }

  getSecurityGear(id: number): void {
    this.securityGearService.findOne(id).subscribe((data) => {
      this.securityGear = data;
      this.form.controls["name"].setValue(this.securityGear.name);
      this.isNew = false;
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let securityGear = new SecurityGear();
      securityGear.id = this.id;
      securityGear.name = this.form.controls["name"].value;
      this.securityGearService
        .update(securityGear.id, securityGear)
        .subscribe((data) => {
          this.router.navigateByUrl("/securitygears");
        });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let securityGear = new SecurityGear();
      securityGear.name = this.form.controls["name"].value;
      this.securityGearService.save(securityGear).subscribe((data) => {
        this.router.navigateByUrl("/securitygears");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
