import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/models/resource.model';
import { ResourceService } from 'src/app/ResourceModule/Resource/resource.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {

  public allResources : Resource[];
  public page : number;
  public nbPage : number;
  public nbResources : number;
  public size : number;

  constructor( private router: Router, public resourceService : ResourceService) {
    this.page = 0;
    this.size = 20; 
  }

  ngOnInit(): void
  {
    this.searchResources();
    this.countResources();
  }

  searchResources()
  {
    this.resourceService.getResourcesNoConsumable(this.page, this.size).subscribe((data) => 
		{
      //Lister les ressources
      this.allResources = data;
    });
  }

  displayCalendar(id: number): void {
    this.router.navigateByUrl("/planningmanagement?id=" + id);
  }

  countResources(){
    this.resourceService.countNoConsumable().subscribe(data=>{
      this.nbResources=data;
      this.nbPage=Math.ceil(data/Number(this.size));
    })
  }

  previous(){
    if(this.page>0){
      this.page--;
      this.searchResources();
    }
  }

  next(){
    if(this.page < (this.nbPage - 1)){
      this.page++;
      this.searchResources();
    }
  }

  changeValue(value:any){
    this.size=value;
    this.page = 0;
    this.nbPage=Math.ceil(this.nbResources/Number(this.size));
    this.searchResources();
  }

}
