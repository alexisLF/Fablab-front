import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { InfoComponent } from "../info/info.component";

@Injectable()
export class InfoService {
  constructor(private dialog: MatDialog) {}
  dialogRef: MatDialogRef<InfoComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(InfoComponent, {
      data: {
        title: options.title,
        message: options.message,
      },
    });

    this.dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 500);
    });
  }
}
