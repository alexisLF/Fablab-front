import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { TypeOperation } from "src/models/type-operation.model";
import { Capacitation } from "src/models/capacitation.model";
import { HttpRequest, HttpEvent } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: "root" })
export class FileService {
  private apiUrl = `${environment.apiURL}core/api/v1/files/`; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  getFilesByDocumentation(id: number) {
    let params = new HttpParams();
    params = params.append("idDocumentation", id.toString());

    const url = `${this.apiUrl}filesByDocumentation`;
    return this.http.get<File[]>(url, { params: params }).pipe(tap((_) => {}));
  }

  addFiles(files: File[], id: number) {
    let params = new HttpParams();
    params = params.append("idDocumentation", id.toString());

    return this.http
      .post<File[]>(this.apiUrl, files, this.httpOptions)
      .pipe(tap((_) => {}));
  }

  deleteFile(id: number): Observable<File> {
    let params = new HttpParams();
    params = params.append("id", id.toString());

    return this.http
      .delete<File>(this.apiUrl, { params: params })
      .pipe(tap((_) => {}));
  }

  getFilesDocumentation(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("idDocumentation", id.toString());

    return this.http.get(`${this.apiUrl}documentation`, { params: params });
  }

  getFilesPurchase(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("idPurchase", id.toString());

    return this.http.get(`${this.apiUrl}purchase`, { params: params });
  }

  upload(files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    files.forEach((f) => formData.append("files", f));

    const req = new HttpRequest("POST", `${this.apiUrl}upload`, formData, {
      reportProgress: true,
      responseType: "json",
    });
    return this.http.request(req);
  }
}
