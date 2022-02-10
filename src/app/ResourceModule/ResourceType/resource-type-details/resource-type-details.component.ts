import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { TypeResource } from "src/models/type-resource.model";
import { FileService } from "../../Documentation/file.service";
import { ResourceTypeService } from "../resource-type.service";

@Component({
  selector: "app-resource-type-details",
  templateUrl: "./resource-type-details.component.html",
  styleUrls: ["./resource-type-details.component.css"],
})
export class ResourceTypeDetailsComponent implements OnInit {
  resourceType: TypeResource;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;
  image: File = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private resourceTypeService: ResourceTypeService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getResourceType(this.id);
    }
  }

  getResourceType(id: number) {
    this.resourceTypeService.findOne(id).subscribe((data) => {
      this.resourceType = data;
      this.form.controls["name"].setValue(this.resourceType.name);
      this.isNew = false;
    });
  }

  findFile() {
    return new Promise((resolve, reject) => {
      //Transform resourcetype.picture to File object
      let img = document.getElementById("image");

      this.srcToFile(
        img.getAttribute("src"),
        img
          .getAttribute("src")
          .substring(img.getAttribute("src").lastIndexOf("/") + 1)
      ).then((file) => {
        this.image = file;
        return resolve(true);
      });
    });
  }

  srcToFile(src, fileName) {
    return fetch(src)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], fileName);
      });
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let resourceType = new TypeResource();
      this.findFile().then((_) => {
        this.onUpload().subscribe((data) => {
          resourceType.id = this.id;
          resourceType.name = this.form.controls["name"].value;
          resourceType.picture = data;
          this.resourceTypeService
            .update(resourceType.id, resourceType)
            .subscribe((data) => {
              this.router.navigateByUrl("/resourcetypes");
            });
        });
      });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let resourceType = new TypeResource();
      this.onUpload().subscribe((data) => {
        resourceType.name = this.form.controls["name"].value;
        resourceType.picture = data;
        this.resourceTypeService.save(resourceType).subscribe((data) => {
          this.router.navigateByUrl("/resourcetypes");
        });
      });
    } else {
      this.formSubmitted = false;
    }
  }

  // On file Select
  onChange(event) {
    this.image = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload(): Observable<string> {
    let files = new Array<File>();
    files.push(this.image);
    var subject = new Subject<string>();
    this.fileService.upload(files).subscribe((data) => {
      if (data != undefined) {
        subject.next(data["body"][0]);
      }
    });
    return subject.asObservable();
  }
}
