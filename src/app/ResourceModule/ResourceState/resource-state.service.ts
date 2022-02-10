import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ResourceState } from "src/models/resource-state.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class ResourceStateService extends CrudService<ResourceState, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "resourcestate", authService);
  }
}
