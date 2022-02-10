import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Documentation } from "src/models/documentation.model";
import { Resource } from "src/models/resource.model";
import { ResourceService } from "../../Resource/resource.service";
import { DocumentationService } from "../documentation.service";
import { File } from "src/models/file.model";
import { FileService } from "../file.service";

@Component({
  selector: "app-documentation-details",
  templateUrl: "./documentation-details.component.html",
  styleUrls: ["./documentation-details.component.css"],
})
export class DocumentationDetailsComponent implements OnInit {
  documentation: Documentation;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;
  idResource: number;
  resource: Resource;
  files: any[] = [];
  filesInit: any[] = [];
  filesTemp: any[] = [];
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = "";
  fileInfos: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private documentationService: DocumentationService,
    private resourceService: ResourceService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
      this.idResource = params["idResource"];
    });

    this.form = this.fb.group({
      description: ["", Validators.compose([Validators.required])],
      useCondition: ["", Validators.compose([Validators.required])],
    });

    if (this.id != undefined) {
      this.getDocumentation(this.id);
    }
    if (this.idResource != undefined) {
      this.resourceService.findOne(this.idResource).subscribe((data) => {
        this.resource = data;
      });
    }
  }

  getDocumentation(id: number): void {
    this.documentationService.findOne(id).subscribe((data) => {
      this.documentation = data;
      this.form.controls["description"].setValue(
        this.documentation.description
      );
      this.form.controls["useCondition"].setValue(
        this.documentation.useCondition
      );
      this.isNew = false;

      this.fileService
        .getFilesDocumentation(this.documentation.id)
        .subscribe((data) => {
          this.files = data;
          this.files.forEach((element) => {
            this.filesTemp.push(element);
          });
        });
    });
  }

  update(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      let documentation = new Documentation();
      documentation.id = this.documentation.id;
      documentation.useCondition = this.form.controls["useCondition"].value;
      documentation.description = this.form.controls["description"].value;
      documentation.filesList = [];

      this.files.forEach((element) => {
        if (!this.filesTemp.includes(element)) {
          let file = new File();
          file.name = element.name;
          file.url = "url";
          this.filesInit.push(file);
        }
      });

      if (this.filesInit.length != 0) {
        this.fileService.upload(this.files).subscribe((data) => {
          if (data != undefined) {
            documentation.filesList = this.filesInit;
            this.documentationService
              .update(documentation.id, documentation)
              .subscribe((_) => {
                this.router.navigateByUrl("/documentations");
              });
          }
        });
      } else {
        this.documentationService
          .update(documentation.id, documentation)
          .subscribe((_) => {
            this.router.navigateByUrl("/documentations");
          });
      }
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let documentation = new Documentation();
      documentation.useCondition = this.form.controls["useCondition"].value;
      documentation.description = this.form.controls["description"].value;
      documentation.filesList = [];

      this.files.forEach((element) => {
        if (!this.filesTemp.includes(element)) {
          let file = new File();
          file.name = element.name;
          file.url = "url";
          this.filesInit.push(file);
        }
      });

      if (this.filesInit.length != 0) {
        this.fileService.upload(this.files).subscribe((data) => {
          if (data != undefined) {
            documentation.filesList = this.filesInit;
            this.documentationService.save(documentation).subscribe((_) => {
              this.router.navigateByUrl("/documentations");
            });
          }
        });
      } else {
        this.documentationService.save(documentation).subscribe((_) => {
          this.router.navigateByUrl("/documentations");
        });
      }
    } else {
      this.formSubmitted = false;
    }
  }

  // *** UPLOAD FILES MANAGEMENT ***

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    console.log(this.files[index].id);

    /*this.fileService.deleteFile(this.files[index].id).subscribe((_) => {
      this.files.splice(index, 1);
    });*/
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals?) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
