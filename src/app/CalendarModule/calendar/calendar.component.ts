import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ResourceService } from "src/app/ResourceModule/Resource/resource.service";
import { Reservation } from "src/models/reservation.model";
import { Resource } from "src/models/resource.model";
import { User } from "src/models/user.model";
import { CalendarService } from "./calendar.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {

  public name : string;


  public form = new FormGroup({
    title: new FormControl(!this.data.title ? '' : this.data.title, Validators.required),
    resource: new FormControl(!this.data.resource ? '' : this.data.resource, Validators.required),
    description: new FormControl(!this.data.description ? '' : this.data.description, Validators.required),
    dateStart: new FormControl(this.data.dateStart, Validators.required),
    dateEnd: new FormControl(this.data.dateEnd, Validators.required),
  });
  public status = this.data.click;
  public title : string;
  public reservation : Reservation;
  public resources: Resource[];
  public filteredResources;
  public id: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public calendarService:CalendarService,
    public dialog: MatDialog,
    public resourceService: ResourceService,
    @Inject(MAT_DIALOG_DATA) public data : any
    )
    {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id == undefined){
      this.route.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
    }

    this.resourceService.findAllResources().subscribe((data) => {
      this.resources = data;
      this.filteredResources = this.resources.slice();
    });

    if (this.data['name'] != undefined)
    {
      this.name = this.data['name'];
    }

    if (this.status === "info")
    {
      console.log(this.data.info);
    }
  }

  public   addEvent() {
    let dialog = this.dialog;
    let reservationObj = new Reservation();
    reservationObj.title = this.form.controls["title"].value;
    reservationObj.description = this.form.controls["description"].value;
    reservationObj.dateStart = this.form.controls["dateStart"].value;
    reservationObj.dateEnd = this.form.controls["dateEnd"].value;
    
    for (let i = 0; i < this.filteredResources.length; i++)
    {
      if (this.filteredResources[i]['id'] == this.id)
      {
        reservationObj.resource = this.filteredResources[i];
      }
    }

    
    let user = new User();
    user.id = 1;
    //reservationObj.user = user;


    if (!this.data.id)
    {
      this.calendarService.save(reservationObj).subscribe((data) => {
        this.dialog.closeAll();
      });
    }
    else
    {
      this.calendarService.update(this.data.id, reservationObj).subscribe((data) => {
        this.dialog.closeAll();
      });
    }

  }

  public setTitle() : string {
    if (this.status === "select") return this.title = 'Ajouter un évenement';
    if (this.status === "info") return this.title = 'Info de l\'évenement';
  }

}
