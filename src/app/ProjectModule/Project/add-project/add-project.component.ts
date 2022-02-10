import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileService } from "src/app/ResourceModule/Documentation/file.service";
import { Project } from "src/models/project.model ";
import { Tag } from "src/models/tag.model";
import { ProjectService } from "../../services/project.service";
import { UserService } from "../../services/user.service";
import { ɵallowPreviousPlayerStylesMerge } from "@angular/animations/browser";
import { User } from "src/models/user.model";
import { TagService } from "../../services/tag.service";
@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"],
})
export class AddProjectComponent implements OnInit {
  users: any = [];
  update: boolean = false;
  tags = new FormControl();
  currentTagValue: string;
  data: Project = new Project();
  idCollaboratorList:any;
  id: number;
  tagsList: Tag[];
  idtagsList: any;
  shortLink: string = "";
  loading: boolean = false;
  file: File = null;
  picture:boolean=false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private fileService: FileService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });
    if (this.id) {
      this.projectService.findOne(this.id).subscribe((data) => {
        this.data = data;
        if(this.data.collaboratorsList!=undefined){
          this.idCollaboratorList = this.data.collaboratorsList.filter(x => x.id > 0).map(x => x.id)
        }
      });
      this.update = true;
    }
    this.userService.findAll().subscribe((data) => {
      this.users = data;
    });
    this.tagService.findAll().subscribe((data) => {
      this.tagsList = data;
      if(this.data.tagsList!=undefined){
        this.idtagsList = this.data.tagsList.filter(x => x.id > 0).map(x => x.id);
      }
    });
  }

  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    let files = new Array<File>();
    files.push(this.file);
    if(this.update){
      this.getTagsFromId();
      this.getCollaboratorsFromId();
    }
    this.fileService.upload(files).subscribe((data) => {
      console.log(data);
      if (data!= undefined) {
        if(data["body"]!=undefined){
          this.data.picture = data["body"][0];
          this.loading = false; // Flag variable
            this.projectService.save(this.data).subscribe((data) => {
              this.picture=true;
              this.router.navigateByUrl("/project");
          });
        }
      }
    });
    if (this.update) {
      if(this.picture==false){
        this.projectService
          .update(this.data.id, this.data)
          .subscribe((data) => {
            this.router.navigateByUrl("/project");
        });
      }
    }
  }

  submit() {
    // emppy stuff
  }
  public confirmAdd(): void {
    this.onUpload();
  }
  public addTag(): void {
    let currentTag: Tag = new Tag();
    currentTag.name = this.currentTagValue;
    this.tagService.save(currentTag).subscribe((data) => {
      this.tagService.findAll().subscribe((data) => {
        this.tagsList = data;
      });
    });
  }
  previous() {
    this.router.navigateByUrl("/project");
  }
  getCollaboratorsFromId(){
    this.data.collaboratorsList=[];
    for(let collaborator of this.idCollaboratorList){
      this.data.collaboratorsList.push(this.users.find(x => x.id === collaborator));
    }
  }
  getTagsFromId(){
    this.data.tagsList=[];
    for(let tag of this.idtagsList){
      this.data.tagsList.push(this.tagsList.find(x => x.id === tag));
    }
    console.log(this.data.tagsList);
  }
}
