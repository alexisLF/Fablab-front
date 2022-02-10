import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DocumentService } from "../../services/document.service";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.css"],
})
export class ConfirmationDialogComponent {
  message: string = "Are you sure?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  id: number;
  type: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private projectService: ProjectService,
    private documentService: DocumentService
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.id = data.id;
      this.type = data.type;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    if (this.type == "project") {
      this.projectService.delete(this.id).subscribe((data) => {
        this.dialogRef.close(true);
      });
    } else if (this.type == "document") {
      this.documentService.delete(this.id).subscribe((data) => {
        this.dialogRef.close(true);
      });
    } else if (this.type == "other") {
      this.dialogRef.close(true);
    }
  }
}
