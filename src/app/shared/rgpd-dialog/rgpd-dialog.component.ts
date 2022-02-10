import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-rgpd-dialog",
  templateUrl: "./rgpd-dialog.component.html",
  styleUrls: ["./rgpd-dialog.component.css"],
})
export class RgpdDialogComponent {
  message: string = "Are you sure?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  id: number;
  type: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RgpdDialogComponent>
  ) {
    if (data) {
      this.message = data.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      }
    }
  }

  onConfirmClick(): void {
      localStorage.setItem("RGPD", "true")
      this.dialogRef.close(true);
  }
}
