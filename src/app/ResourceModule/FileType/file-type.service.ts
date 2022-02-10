import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CrudService } from "src/app/shared/crud/crud.service";
import { TypeFile } from "src/models/type-file.model";
import { AuthService } from "src/app/shared/auth/auth.service";
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: "root" })
export class FileTypeService extends CrudService<TypeFile, number> {
  constructor(protected _http: HttpClient, protected authService: AuthService) {
    super(_http, "typefile", authService);
  }
}
