import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Site } from "src/models/site.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class SiteService extends CrudService<Site, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "site", authService);
  }
}
