import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Room } from "src/models/room.model";
import { Resource } from "src/models/resource.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class ResourceService extends CrudService<Resource, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "resource", authService);
  }

  getResourcesByType(id: number) {
    let params = new HttpParams();
    params = params.append("idType", id.toString());

    const url = this._base + "/allByType";
    return this._http
      .get<Resource[]>(url, { headers: this.headers, params: params })
      .pipe(tap((_) => {}));
  }

  getResourcesNoConsumable(page:number,size:number): Observable<Resource[]> {
    const url = this._base + '/noconsumable?page='+page+'&size='+size;
    return this._http
      .get<Resource[]>(url, { headers: this.headers })
      .pipe(tap((_) => {}));
  }

  countNoConsumable(): Observable<number> {
    const url = this._base + '/countnoconsumable';
    return this._http
      .get<number>(url, { headers:this.headers })
      .pipe(tap((_) => console.log("fetched resources")));
  }

  findAllResources(): Observable<Resource[]> {
    return this._http.get<Resource[]>(this._base+'/all', {headers:this.headers});
  }
}
