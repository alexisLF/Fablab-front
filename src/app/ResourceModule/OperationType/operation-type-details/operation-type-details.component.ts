import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TypeOperation } from "src/models/type-operation.model";
import { OperationTypeService } from "../operation-type.service";

@Component({
  selector: "app-operation-type-details",
  templateUrl: "./operation-type-details.component.html",
  styleUrls: ["./operation-type-details.component.css"],
})
export class OperationTypeDetailsComponent implements OnInit {
  operationType2: TypeOperation;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private operationTypeService: OperationTypeService
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
      this.getTypeOperation(this.id);
    }
  }

  getTypeOperation(id: number): void {
    this.operationTypeService.findOne(id).subscribe((data) => {
      this.operationType2 = data;
      this.form.controls["name"].setValue(this.operationType2.name);
      this.form.controls["description"].setValue(
        this.operationType2.description
      );
      this.isNew = false;
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let operationType = new TypeOperation();
      operationType.id = this.id;
      operationType.name = this.form.controls["name"].value;
      operationType.description = this.form.controls["description"].value;
      this.operationTypeService
        .update(operationType.id, operationType)
        .subscribe((data) => {
          this.router.navigateByUrl("/operationtypes");
        });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let operationType = new TypeOperation();
      operationType.name = this.form.controls["name"].value;
      operationType.description = this.form.controls["description"].value;
      this.operationTypeService.save(operationType).subscribe((data) => {
        this.router.navigateByUrl("/operationtypes");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
