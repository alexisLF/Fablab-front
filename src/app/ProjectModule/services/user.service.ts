import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { User } from 'src/models/user.model';
import { CrudService } from 'src/app/shared/crud/crud.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
@Injectable({ providedIn: "root" })
export class UserService extends CrudService<User, number>{
    constructor(protected _http: HttpClient, protected authService: AuthService) {
        super(_http, 'user',authService);
    }
}
