import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Maintenance } from "src/models/maintenance.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class MaintenanceService extends CrudService<Maintenance, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "maintenance", authService);
  }
}
