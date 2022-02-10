import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { tap } from "rxjs/operators";
import { Room } from "src/models/room.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class RoomService extends CrudService<Room, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "room", authService);
  }

  getRoomsBySite(id: number) {
    let params = new HttpParams();
    params = params.append("idSite", id.toString());

    const url = this._base + "/allBySite";
    return this._http
      .get<Room[]>(url, { headers: this.headers, params: params })
      .pipe(tap((_) => {}));
  }
}
