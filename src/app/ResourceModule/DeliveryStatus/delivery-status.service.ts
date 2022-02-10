import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { DeliveryStatus } from "src/models/delivery-status.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class DeliveryStatusService extends CrudService<DeliveryStatus, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "deliverystatus", authService);
  }
}
