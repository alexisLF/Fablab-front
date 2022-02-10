import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DeliveryStatus } from "src/models/delivery-status.model";
import { DeliveryStatusService } from "../delivery-status.service";

@Component({
  selector: "app-delivery-status-details",
  templateUrl: "./delivery-status-details.component.html",
  styleUrls: ["./delivery-status-details.component.css"],
})
export class DeliveryStatusDetailsComponent implements OnInit {
  deliveryStatus: DeliveryStatus;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private deliveryStatusService: DeliveryStatusService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getDeliveryStatus(this.id);
    }
  }

  getDeliveryStatus(id: number): void {
    this.deliveryStatusService.findOne(id).subscribe((data) => {
      this.deliveryStatus = data;
      this.form.controls["name"].setValue(this.deliveryStatus.name);
      this.isNew = false;
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let deliveryStatus = new DeliveryStatus();
      deliveryStatus.id = this.id;
      deliveryStatus.name = this.form.controls["name"].value;
      this.deliveryStatusService
        .update(deliveryStatus.id, deliveryStatus)
        .subscribe((data) => {
          this.router.navigateByUrl("/deliverystatus");
        });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let deliveryStatus = new DeliveryStatus();
      deliveryStatus.name = this.form.controls["name"].value;
      this.deliveryStatusService.save(deliveryStatus).subscribe((data) => {
        this.router.navigateByUrl("/deliverystatus");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
