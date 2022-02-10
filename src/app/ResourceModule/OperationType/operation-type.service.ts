import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TypeOperation } from "src/models/type-operation.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class OperationTypeService extends CrudService<TypeOperation, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "typeoperation", authService);
  }
}
