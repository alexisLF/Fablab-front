import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TypeResource } from "src/models/type-resource.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class ResourceTypeService extends CrudService<TypeResource, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "typeresource", authService);
  }
}
