import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Resource } from "src/models/resource.model";
import { Room } from "src/models/room.model";
import { Site } from "src/models/site.model";
import { ResourceService } from "../../Resource/resource.service";
import { SiteService } from "../../Site/site.service";
import { RoomService } from "../room.service";

@Component({
  selector: "app-room-details",
  templateUrl: "./room-details.component.html",
  styleUrls: ["./room-details.component.css"],
})
export class RoomDetailsComponent implements OnInit {
  room: Room;
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;
  idSite: number;
  sites: Site[];
  resources: Resource[];
  site: Site;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roomService: RoomService,
    private siteService: SiteService,
    private resourceService: ResourceService
  ) {}

  ngOnInit() {
    if (this.router.url.includes("?idSite=")) {
      this.route.queryParams.subscribe((params) => {
        this.idSite = params["idSite"];
      });
    } else if (this.router.url.includes("?id=")) {
      this.route.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
    }

    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      floor: ["", Validators.compose([Validators.required])],
      site: ["", Validators.compose([Validators.required])],
    });

    this.siteService.getAll().subscribe((data) => {
      this.sites = data;
      if (this.idSite != undefined) {
        this.sites.forEach((site) => {
          if (this.idSite == site.id) {
            this.form.controls["site"].setValue(site.name);
            this.site = site;
          }
        });
      }
    });
    if (this.id != undefined) {
      this.getRoom(this.id);
    }
  }

  getRoom(id: number): void {
    this.roomService.findOne(id).subscribe((data) => {
      this.room = data;
      this.site = this.room.site;
      this.form.controls["name"].setValue(this.room.name);
      this.form.controls["floor"].setValue(this.room.floor);
      this.sites.forEach((site) => {
        if (this.room.site.id == site.id) {
          this.form.controls["site"].setValue(site.name);
        }
      });
      this.isNew = false;
      this.resources = data.resourceList;
    });
  }

  viewResource(idResource: number): void {
    this.router.navigateByUrl("/resources-details?id=" + idResource);
  }

  addResource(idSite: number): void {
    this.router.navigateByUrl("/resources-details?idSite=" + idSite);
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let room = new Room();
      room.id = this.id;
      room.name = this.form.controls["name"].value;
      room.floor = this.form.controls["floor"].value;
      room.site = this.site;
      this.roomService.update(room.id, room).subscribe((data) => {
        this.router.navigateByUrl("/sites");
      });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let room = new Room();
      room.name = this.form.controls["name"].value;
      room.floor = this.form.controls["floor"].value;
      room.site = this.site;

      this.roomService.save(room).subscribe((data) => {
        this.router.navigateByUrl("/sites");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
