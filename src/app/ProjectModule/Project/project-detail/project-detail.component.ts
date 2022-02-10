import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/models/project.model ';
import { DocumentService } from '../../services/document.service';
import { ProjectService } from '../../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../modals/confirmation-dialog/confirmation-dialog.component';
import { AddDocumentComponent } from '../../modals/add-document/add-document.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project:Project;
  private id:number;
  panelOpenState:boolean=false;

  constructor(private router: Router, private route: ActivatedRoute, private projectService:ProjectService, private documentService:DocumentService, private dialog:MatDialog,) {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    if (this.id != undefined) {
      this.getProject(this.id);
      //console.log(this.getProject(this.id));
    } else {
      console.log("Objet undefined");
    }

   }

  ngOnInit(): void {
  }

  getProject(id:number){
    this.projectService.findOne(id).subscribe((data) => {
      this.project=data;
      console.log(this.project);
    });
  }
  goToProjectList(): void {
    this.router.navigateByUrl("/project");
  }

  deleteDocument(idDocument:number,idProject:number):void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        id: idDocument,
        type:'document',
        message: 'Etes vous sur de vouloir supprimer ce document ?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non'
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.findOne(idProject).subscribe(data => {
          this.project = data;
        });
      }
    });
  }

  addDocument() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      data: {id:this.project.id,title: this.project.title, status: this.project.status, dateStart: this.project.dateStart, description: this.project.description, dateEnd: this.project.dateEnd,creator:this.project.creator, tagsList:this.project.tagsList,collaboratorsList:this.project.collaboratorsList,documentsList:this.project.documentsList, picture:this.project.picture}

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.findOne(this.project.id).subscribe(data => {
          this.project = data;
        });
      }
    });
  }

  goToLink(documentPath: string){
    let url = 'http://localhost:4200/assets/uploads/'+documentPath;
    window.open(url, "_blank");
  }

  

  

}
