import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resource } from 'src/models/resource.model';
import { CalendarComponent } from 'src/app/CalendarModule/calendar/calendar.component';
import { CalendarService } from '../../calendar/calendar.service';

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements OnInit {

  public id : number;
  public title : string;
  public dateStart : string;
  public dateEnd: string;
  public description : string;
  public resource : Resource;
  public refresh : Function;
  constructor(
    public calendarService:CalendarService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data
  )
  {}

  ngOnInit(): void {
    this.id = this.data['id'];
    this.title = this.data['title'];
    this.dateStart = formatDate(this.data['dateStart'], 'dd/MM/yyyy HH:mm', 'en-US');
    this.dateEnd = formatDate(this.data['dateEnd'], 'dd/MM/yyyy HH:mm', 'en-US');
    this.description = this.data ['description'];
    this.resource = this.data ['resource'];
    this.refresh = this.data ['refresh'];
  }

  public update() {
      let self = this;
      let dialog = this.dialog;

      this.calendarService.findOne(this.id).subscribe(function(data)
      {
          const dialogRef = dialog.open(CalendarComponent, {
            width: '550px',
            height:'400px',
            data : {
              click:'select',
              title:data['title'],
              dateStart:formatDate(data['dateStart'] , 'yyyy-MM-ddTHH:mm', 'en-US'),
              dateEnd:formatDate(data['dateEnd'] , 'yyyy-MM-ddTHH:mm', 'en-US'),
              description:data['description'],
              resource:data['resource'],
              id:data['id']
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            self.refresh();
          });
      });
  }

  public remove()
  {
    console.log('delete');
    this.calendarService.delete(this.id).subscribe(function(data)
    {
      console.log(data);
    })
  }

}
