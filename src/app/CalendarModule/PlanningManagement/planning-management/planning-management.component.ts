import { Component, OnInit, Inject } from '@angular/core';
import { Calendar, CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import frLocale from '@fullcalendar/core/locales/fr'
import dayGridPlugin from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import interaction from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from 'src/models/reservation.model';
import { CalendarService } from '../../calendar/calendar.service';
import {MatDialogModule} from '@angular/material/dialog';
import { CalendarComponent } from '../../calendar/calendar.component';
import { formatDate } from '@angular/common';
import { InfoEventComponent } from '../info-event/info-event.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'planning-management',
  templateUrl: './planning-management.component.html',
  styleUrls: ['./planning-management.component.css']
})

export class PlanningManagementComponent implements OnInit {

  public allReservation : Reservation[];
  public click : string;
  public id: number;
  public displayInfo : boolean = false;
  public locales = frLocale;
  public calendarOptions: CalendarOptions = {
	timeZone: 'UTC+2',
    plugins: [dayGridPlugin, timegrid, interaction],
    initialView: 'timeGridWeek',
    height: 500,
    selectable: true,
	editable: false,
    locale: frLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,dayGridMonth'
    },
  };

  constructor(
    public dialog: MatDialog,
    public calendarService:CalendarService,
	private route: ActivatedRoute,
  ) { 
    const name = Calendar.name;
  }

	ngOnInit(): void 
	{	
		this.route.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.refreshAll();

		let serviceObj = this.calendarService;
		let dialogObj = this.dialog;
		let self = this;

		this.calendarOptions.select=function(info) 
		{
			this.click = "select"
			self.openDialog(info, this.click);
		}
		this.calendarOptions.eventClick= function(info) 
		{
			this.click = "info"
			self.openDialog(info, this.click);
		}
  	}

	public openDialog(info, click: string): void {	
		if (click === "select") this.selectEvent(info, "select");			
		if (click === "info") this.infoEvent(info, "info");
	}

	public selectEvent(info : DateSelectArg, click : string) {
		let dateStart = formatDate(info.startStr , 'yyyy-MM-ddTHH:mm', 'en-US');
		let dateEnd = formatDate(info.endStr, 'yyyy-MM-ddTHH:mm', 'en-US');

		const dialogRef = this.dialog.open(CalendarComponent, {
			width: '550px',
			height:'400px',
			data: 
			{
				dateStart: dateStart, 
				dateEnd: dateEnd, 
				click: click,
				resourceId:this.id
			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			this.refreshAll();
		});
	}

	public infoEvent(info : EventClickArg, click : string) {
		var self = this;
		var id = info.event.id;
		var dialog = this.dialog;
		this.calendarService.findOne(parseInt(info.event.id)).subscribe(function(data)
		{
			self.displayInfoEvent(data);
		});
	}

	public displayInfoEvent(data : Reservation)
	{
		let self = this;
		data['refresh'] = function()
		{
			self.refreshAll();
		}
		
		const dialogRef = this.dialog.open(InfoEventComponent, {
			width: '550px',
			height:'400px',
			data: data,
		});

		dialogRef.afterClosed().subscribe(result => {
			this.refreshAll()
		});
	}

	public refreshAll() {
		this.calendarService.findByResource(this.id).subscribe((data) => 
		{
			this.allReservation = data;
			let newEvents = [];

			for (let i = 0; i < this.allReservation.length; i++)
			{
				let reservationItem = this.allReservation[i];
				newEvents.push(
				{
					'id' : reservationItem.id, 
					'title' : reservationItem.title, 
					'start' : reservationItem.dateStart, 
					'end' : reservationItem.dateEnd
				});
			}
			this.calendarOptions.events = newEvents;
		});
  	}

}
