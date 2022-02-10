import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Documentation } from "src/models/documentation.model";
import { CrudService } from "src/app/shared/crud/crud.service";
import { AuthService } from "src/app/shared/auth/auth.service";

@Injectable({ providedIn: "root" })
export class DocumentationService extends CrudService<Documentation, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "documentation", authService);
  }
}
