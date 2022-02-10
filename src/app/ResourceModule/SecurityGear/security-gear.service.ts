import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SecurityGear } from "src/models/security-gear.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class SecurityGearService extends CrudService<SecurityGear, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "securitygear", authService);
  }
}
