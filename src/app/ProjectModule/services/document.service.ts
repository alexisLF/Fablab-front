import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Document } from 'src/models/document.model';
import { CrudService } from 'src/app/shared/crud/crud.service';
import { Observable, of } from "rxjs";
import { AuthService } from 'src/app/shared/auth/auth.service';
@Injectable({ providedIn: "root" })
export class DocumentService extends CrudService<Document, number>{
    constructor(protected _http: HttpClient, protected authService: AuthService) {
        super(_http, 'document', authService);
    }
}
