import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Purchase } from "src/models/purchase.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class PurchaseService extends CrudService<Purchase, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "purchase", authService);
  }
}
