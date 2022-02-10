import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/models/project.model ';
import { Document } from 'src/models/document.model';
import { DocumentService } from '../../services/document.service';
import { ProjectService } from '../../services/project.service';
import { FileService } from "src/app/ResourceModule/Documentation/file.service";

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  documents:any=[];
  document:Document=new Document;
  update:boolean=false;
  shortLink: string = "";
  loading: boolean = false;
  file: File = null;

  constructor(public dialogRef: MatDialogRef<AddDocumentComponent>,@Inject(MAT_DIALOG_DATA) public data: Project,private projectService:ProjectService, private documentService:DocumentService, private fileService: FileService) { 
    }

  ngOnInit(): void {
    this.documentService.findAll().subscribe(data => {
      this.documents = data;
      });
      
      console.log(this.data);
  }
  
  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

    // On file Select
    onChange(event) {
      this.file = event.target.files[0];
    }
  
    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
        let files = new Array<File>();
        files.push(this.file)
        console.log(files);
        this.fileService.upload(files).subscribe(
          (data) => {
            console.log(data);
            if (data != undefined) {
              this.document.path = data["body"][0];
              console.log("upload project document", data)
              this.loading = false; // Flag variable 
              this.documentService.save(this.document).subscribe((data) => {
              this.data.documentsList.push(data);
                this.projectService.update(this.data.id,this.data).subscribe((data) => {this.dialogRef.close(true);});
              });
            }}
        );
    }

  public confirmAdd(): void {
    this.onUpload();
    
  }
}
