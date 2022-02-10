import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Capacitation } from "src/models/capacitation.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class CapacitationService extends CrudService<Capacitation, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "resourcecapacitation", authService);
  }
}
