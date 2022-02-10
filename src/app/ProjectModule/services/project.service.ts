import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/shared/crud/crud.service';
import { Observable, of } from "rxjs";
import { Project } from 'src/models/project.model ';
import { AuthService } from 'src/app/shared/auth/auth.service';
@Injectable({ providedIn: "root" })
export class ProjectService extends CrudService<Project, number>{
    constructor(protected _http: HttpClient, protected authService: AuthService) {
        super(_http, 'project', authService);
    }
}
