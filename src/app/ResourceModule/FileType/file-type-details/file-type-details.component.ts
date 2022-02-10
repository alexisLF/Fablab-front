import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TypeFile } from "src/models/type-file.model";
import { FileTypeService } from "../file-type.service";

@Component({
  selector: "app-file-type-details",
  templateUrl: "./file-type-details.component.html",
  styleUrls: ["./file-type-details.component.css"],
})
export class FileTypeDetailsComponent implements OnInit {
  fileType: TypeFile;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fileTypeService: FileTypeService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getTypeFile(this.id);
    }
  }

  getTypeFile(id: number): void {
    this.fileTypeService.findOne(id).subscribe((data) => {
      this.fileType = data;
      this.form.controls["name"].setValue(this.fileType.name);
      this.isNew = false;
    });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let fileType = new TypeFile();
      fileType.id = this.id;
      fileType.name = this.form.controls["name"].value;
      this.fileTypeService.update(fileType.id, fileType).subscribe((data) => {
        this.router.navigateByUrl("/filetypes");
      });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let fileType = new TypeFile();
      fileType.name = this.form.controls["name"].value;
      this.fileTypeService.save(fileType).subscribe((data) => {
        this.router.navigateByUrl("/filetypes");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
