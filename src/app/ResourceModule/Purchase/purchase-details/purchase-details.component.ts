import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { DeliveryStatus } from "src/models/delivery-status.model";
import { Purchase } from "src/models/purchase.model";
import { Resource } from "src/models/resource.model";
import { DeliveryStatusService } from "../../DeliveryStatus/delivery-status.service";
import { FileService } from "../../Documentation/file.service";
import { ResourceService } from "../../Resource/resource.service";
import { PurchaseService } from "../purchase.service";
import { File } from "src/models/file.model";

@Component({
  selector: "app-purchase-details",
  templateUrl: "./purchase-details.component.html",
  styleUrls: ["./purchase-details.component.css"],
})
export class PurchaseDetailsComponent implements OnInit {
  purchase: Purchase;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;
  deliveryStatusList: DeliveryStatus[];
  filteredListDeliveryStatus;
  resources: Resource[];
  filteredResources;
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
    private purchaseService: PurchaseService,
    private deliveryStatusService: DeliveryStatusService,
    private resourceService: ResourceService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      date: [new Date(), Validators.compose([Validators.required])],
      deliveryStatus: ["", Validators.compose([Validators.required])],
      resource: [""],
    });

    this.deliveryStatusService.getAll().subscribe((data) => {
      this.deliveryStatusList = data;
      this.filteredListDeliveryStatus = this.deliveryStatusList.slice();
    });

    this.resourceService.getAll().subscribe((data) => {
      this.resources = data;
      this.filteredResources = this.resources.slice();
    });

    if (this.id != undefined) {
      this.getPurchase(this.id);
    }
  }

  getPurchase(id: number): void {
    this.purchaseService.findOne(id).subscribe((data) => {
      this.purchase = data;
      this.form.controls["name"].setValue(this.purchase.name);
      this.form.controls["date"].setValue(this.purchase.purchaseDate);
      this.deliveryStatusList.forEach((status) => {
        if (this.purchase.delivery.id == status.id) {
          this.form.controls["deliveryStatus"].setValue(status);
        }
      });
      this.resources.forEach((resource) => {
        if (this.purchase.resource.id == resource.id) {
          this.form.controls["resource"].setValue(resource);
        }
      });
      this.isNew = false;

      this.fileService.getFilesPurchase(this.purchase.id).subscribe((data) => {
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
      let purchase = new Purchase();
      purchase.id = this.id;
      purchase.name = this.form.controls["name"].value;
      purchase.purchaseDate = this.form.controls["date"].value;
      purchase.delivery = this.form.controls["deliveryStatus"].value;
      purchase.resource = this.form.controls["resource"].value;
      purchase.filesList = [];

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
            purchase.filesList = this.filesInit;
            this.purchaseService
              .update(purchase.id, purchase)
              .subscribe((data) => {
                this.router.navigateByUrl("/purchases");
              });
          }
        });
      } else {
        this.purchaseService.update(purchase.id, purchase).subscribe((data) => {
          this.router.navigateByUrl("/purchases");
        });
      }
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      let purchase = new Purchase();
      purchase.name = this.form.controls["name"].value;
      purchase.purchaseDate = this.form.controls["date"].value;
      purchase.delivery = this.form.controls["deliveryStatus"].value;
      purchase.resource = this.form.controls["resource"].value;
      purchase.filesList = [];

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
            purchase.filesList = this.filesInit;
            this.purchaseService.save(purchase).subscribe((data) => {
              this.router.navigateByUrl("/purchases");
            });
          }
        });
      } else {
        if (this.files.length != 0) {
          purchase.filesList = this.filesInit;
        }
        this.purchaseService.save(purchase).subscribe((data) => {
          this.router.navigateByUrl("/purchases");
        });
      }
    } else {
      this.formSubmitted = false;
    }
  }

  // *** FILES UPLOAD MANAGEMENT ***
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
    this.fileService.deleteFile(this.files[index].id).subscribe((_) => {
      this.files.splice(index, 1);
    });
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
