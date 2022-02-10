import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { DialogService } from "../shared/dialog/dialog.service";
import { InfoService } from "../shared/info/info.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private dialogService: DialogService,
    private infoService: InfoService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body) {
            if (evt.body.ERROR) {
              const options = {
                isConfirm: false,
                title: "Erreur",
                message: evt.body.MESSAGE,
                cancelText: "",
                confirmText: "OK",
              };

              this.dialogService.open(options);

              this.dialogService.confirmed().subscribe((confirmed) => {
                if (confirmed) {
                }
              });
            } else {
              if (evt.body.MESSAGE != "" && evt.body.MESSAGE != undefined) {
                const options = {
                  title: "Info",
                  message: evt.body.MESSAGE,
                };

                this.infoService.open(options);
              }

              evt = evt.clone({ body: evt.body.DATA });

              return evt;
            }
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          //log error
        }
        return of(err);
      })
    );
  }
}
