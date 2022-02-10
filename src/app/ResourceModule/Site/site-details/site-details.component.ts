import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "src/models/room.model";
import { Site } from "src/models/site.model";
import { RoomService } from "../../Room/room.service";
import { SiteService } from "../site.service";

@Component({
  selector: "app-site-details",
  templateUrl: "./site-details.component.html",
  styleUrls: ["./site-details.component.css"],
})
export class SiteDetailsComponent implements OnInit {
  site: Site;
  rooms: Room[];
  form: FormGroup;
  formSubmitted: boolean = false;
  isNew: boolean = true;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private siteService: SiteService,
    private roomService: RoomService
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
      this.getSite(this.id);
    }
  }

  getSite(id: number): void {
    this.siteService.findOne(id).subscribe((data) => {
      this.site = data;
      this.rooms = data.roomList;
      this.form.controls["name"].setValue(this.site.name);
      this.form.controls["description"].setValue(this.site.description);
      this.isNew = false;
    });
  }

  viewRoom(idRoom: number): void {
    this.router.navigateByUrl("/rooms-details?id=" + idRoom);
  }

  addRoom(idSite: number): void {
    this.router.navigateByUrl("/rooms-details?idSite=" + idSite);
  }

  update(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let site = new Site();
      site.id = this.id;
      site.name = this.form.controls["name"].value;
      site.description = this.form.controls["description"].value;
      this.siteService.update(site.id, site).subscribe((data) => {
        this.router.navigateByUrl("/sites");
      });
    } else {
      this.formSubmitted = false;
    }
  }

  save(): void {
    this.formSubmitted = true;

    if (this.form.valid) {
      let site = new Site();
      site.name = this.form.controls["name"].value;
      site.description = this.form.controls["description"].value;
      this.siteService.save(site).subscribe((data) => {
        this.router.navigateByUrl("/sites");
      });
    } else {
      this.formSubmitted = false;
    }
  }
}
