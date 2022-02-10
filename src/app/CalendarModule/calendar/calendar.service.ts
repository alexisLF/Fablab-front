import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/shared/crud/crud.service';
import { Observable, of } from "rxjs";
import { Reservation } from "src/models/reservation.model";
import { AuthService } from 'src/app/shared/auth/auth.service';
@Injectable({ providedIn: "root" })
export class CalendarService extends CrudService<Reservation, number>{
    constructor(protected _http: HttpClient, protected authService: AuthService) {
        super(_http, 'reservation', authService);
    }

    findByResource(id: number): Observable<Reservation[]> {
        return this._http.get<Reservation[]>(this._base + "/resource/" + id, {headers:this.headers});
    }
}
