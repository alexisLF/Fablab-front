import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { Documentation } from "src/models/documentation.model";
import { ResourceState } from "src/models/resource-state.model";
import { Resource } from "src/models/resource.model";
import { Room } from "src/models/room.model";
import { TypeResource } from "src/models/type-resource.model";
import { DocumentationService } from "../../Documentation/documentation.service";
import { FileService } from "../../Documentation/file.service";
import { ResourceStateService } from "../../ResourceState/resource-state.service";
import { ResourceTypeService } from "../../ResourceType/resource-type.service";
import { RoomService } from "../../Room/room.service";
import { SiteService } from "../../Site/site.service";
import { ResourceService } from "../resource.service";

@Component({
  selector: "app-resource-details",
  templateUrl: "./resource-details.component.html",
  styleUrls: ["./resource-details.component.css"],
})
export class ResourceDetailsComponent implements OnInit {
  resource: Resource;
  form: FormGroup;
  secondFormGroup: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;
  typeId: number;
  rooms: Room[];
  filteredRooms;
  states: ResourceState[];
  filteredStates;
  documentations: Documentation[];
  filteredDocumentations;
  isLinear = false;
  file: File = null;
  resourceType: TypeResource;
  resourceTypeName: string;
  resourceTypes: TypeResource[];
  filteredResourceTypes;
  siteId: number;
  siteName: string;
  room: Room;
  role:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private resourceStateService: ResourceStateService,
    private roomService: RoomService,
    private fileService: FileService,
    private documentationService: DocumentationService,
    private resourceTypeService: ResourceTypeService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.role = localStorage.getItem("role")
    if (this.typeId == undefined) {
      this.route.queryParams.subscribe((params) => {
        this.typeId = params["typeId"];
      });
    }

    if (this.siteId == undefined) {
      this.route.queryParams.subscribe((params) => {
        this.siteId = params["idSite"];
      });
    }

    if (this.id == undefined) {
      this.route.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
    }

    this.resource = new Resource();
    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      reference: ["", Validators.compose([Validators.required])],
      installationDate: [new Date(), Validators.compose([Validators.required])],
      stock: [0, Validators.compose([Validators.required])],
      isActive: [false],
      states: ["", Validators.compose([Validators.required])],
      rooms: ["", Validators.compose([Validators.required])],
      documentations: [""],
      resourceType: ["", Validators.compose([Validators.required])],
    });

    this.resourceStateService.getAll().subscribe((data) => {
      this.states = data;
      this.filteredStates = this.states.slice();
    });

    this.roomService.getAll().subscribe((data) => {
      this.rooms = data;
      this.filteredRooms = this.rooms.slice();
    });

    this.documentationService.getAll().subscribe((data) => {
      this.documentations = data;
      this.filteredDocumentations = this.documentations.slice();
    });

    if(this.typeId != undefined){
      this.resourceTypeService.findOne(this.typeId).subscribe((data) => {
        console.log(data)
        this.form.controls["resourceType"].setValue(data);
        this.resourceTypeName = data.name
      })
    }else{
      this.resourceTypeService.getAll().subscribe((data) => {
        this.resourceTypes = data;
        this.filteredResourceTypes = this.resourceTypes.slice();
      });
    }
    
    if (this.id != undefined) {
      this.getResource(this.id);
    }

    if (this.siteId != undefined) {
      this.roomService.findOne(this.siteId).subscribe((data) => {
        
        this.form.controls["rooms"].setValue(data);
        this.room = data
        this.siteName = data.name
      })
    }

  }

  getResource(id: number): void {
    this.resourceService.findOne(id).subscribe((data) => {
      this.resource = data;
      this.resourceTypeName = this.resource.type.name
      this.resourceType = this.resource.type
      this.form.controls["name"].setValue(this.resource.name);
      this.form.controls["reference"].setValue(this.resource.ref);
      this.form.controls["installationDate"].setValue(
        this.resource.dateInstallation
      );
      this.form.controls["reference"].setValue(this.resource.ref);
      this.form.controls["stock"].setValue(this.resource.stock);
      this.form.controls["resourceType"].setValue(this.resource.type);
      this.form.patchValue({ isActive: this.resource.isActive });
      this.states.forEach((state) => {
        if (this.resource.state.id == state.id) {
          this.form.controls["states"].setValue(state);
        }
      });
      this.rooms.forEach((room) => {
        if (this.resource.room.id == room.id) {
          this.form.controls["rooms"].setValue(room);
        }
      });
      this.documentations.forEach((documentation) => {
        if (this.resource.documentation.id == documentation.id) {
          this.form.controls["documentations"].setValue(documentation);
        }
      });
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
        this.file = file;
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
      this.findFile().then((_) => {
        this.onUpload().subscribe((picture) => {
          this.resource.picture = picture;
          this.resource.name = this.form.controls["name"].value;
          this.resource.ref = this.form.controls["reference"].value;
          this.resource.dateInstallation =
            this.form.controls["installationDate"].value;
          this.resource.stock = this.form.controls["stock"].value;
          this.resource.isActive = this.form.controls["isActive"].value;
          this.resource.state = this.form.controls["states"].value;
          this.resource.room = this.form.controls["rooms"].value;
          this.resource.type = this.form.controls["resourceType"].value;
          this.resource.documentation =
            this.form.controls["documentations"].value;
          this.resourceService
            .update(this.resource.id, this.resource)
            .subscribe((data) => {
              this.router.navigateByUrl(
                "/resources-list/" + this.resource.type.id
              );
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
      this.onUpload().subscribe((picture) => {
        this.resource.picture = picture;
        this.resource.name = this.form.controls["name"].value;
        this.resource.ref = this.form.controls["reference"].value;
        this.resource.dateInstallation =
          this.form.controls["installationDate"].value;
        this.resource.stock = this.form.controls["stock"].value;
        this.resource.isActive = this.form.controls["isActive"].value;
        this.resource.state = this.form.controls["states"].value;
        this.resource.room = this.form.controls["rooms"].value;
        this.resource.type = this.form.controls["resourceType"].value;
        this.resource.documentation =
          this.form.controls["documentations"].value;
        this.resourceService.save(this.resource).subscribe((data) => {
          this.router.navigateByUrl("/resources-list/" + this.resource.type.id);
        });
      });
    } else {
      this.formSubmitted = false;
    }
  }

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload(): Observable<string> {
    let files = new Array<File>();
    files.push(this.file);
    var subject = new Subject<string>();
    this.fileService.upload(files).subscribe((data) => {
      if (data != undefined) {
        subject.next(data["body"][0]);
      }
    });
    return subject.asObservable();
  }
}
