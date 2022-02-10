import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MaintenanceStatus } from "src/models/maintenance-status.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class MaintenanceStatusService extends CrudService<
  MaintenanceStatus,
  number
> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "maintenancestatus", authService);
  }
}
