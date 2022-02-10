import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/models/project.model ';
import { Tag } from 'src/models/tag.model';
import { DocumentService } from '../services/document.service';
import { ProjectService } from '../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';
import { User } from 'src/models/user.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  toggleSearch: boolean = false;
  searchText = '';
  page:number;
  size="5";
  nbPage;
  nbProject:number;
  projects: any = [];
  displayedColumns: string[] = ['id', 'project_picture', 'project_title', 'project_status','project_description','project_date_end','project_date_start','actions'];
  
  constructor(private projectService:ProjectService, private documentService:DocumentService,private dialog:MatDialog, private router: Router,) { 
    this.page=0;
    this.countProjects();
    this.searchProjects();
    /*
    this.dataSource.filterPredicate = (data: Element, filter: string) => {
      return data.name == filter;
     };*/
  }

  ngOnInit(): void {
    this.toggleSearch = true;
  }

  searchProjects(){
    this.projectService.findAllFilter(this.searchText,this.page,Number(this.size)).subscribe(data => {
      this.projects = data;
    });
  }
  countProjects(){
    this.projectService.count().subscribe(data=>{
      this.nbProject=data;
      this.nbPage=Math.ceil(this.nbProject/Number(this.size));
    })
  }
  addProject() {
    this.router.navigateByUrl("/add-project");
  }
  updateProject(id:number,title: string, status: string, dateStart: string, description: string, dateEnd: string,creator:User, tagsList:Tag[],collaboratorsList:User[], picture:string) {
    this.router.navigateByUrl("/add-project?id=" + id);
  }

  deleteProject( id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        id: id,
        type:'project',
        message: 'Etes vous sur de vouloir supprimer ce projet?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchProjects();
      }
    });
  }

  goToProject(id: number): void {
    this.router.navigateByUrl("/project/id?id=" + id);
  }
  searchClose() {
    this.searchText = '';
    this.searchProjects();
  }
  search(){
    console.log(this.searchText)
    this.searchProjects();
  }
  previous(){
    if(this.page>0){
      this.page--;
      this.searchProjects();
    }
  }
  next(){
    if((this.nbProject/Number(this.size))-1>this.page){
      this.page++;
      this.searchProjects();
    }
  }
  changeValue(value:any){
    this.size=value;
    this.searchProjects();
  }
}
