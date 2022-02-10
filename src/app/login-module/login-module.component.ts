import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth/auth.service";
import { RgpdDialogComponent } from "../shared/rgpd-dialog/rgpd-dialog.component";
import { ValidationService } from "../shared/validation.service";

@Component({
  selector: "app-login-module",
  templateUrl: "./login-module.component.html",
  styleUrls: ["./login-module.component.css"],
})
export class LoginModuleComponent implements OnInit {
  public loginForm;
  public loginPending: boolean = false;
  public showError: boolean = false;
  public isSubscribe: boolean = false;
  public confirmPassword;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const remember = localStorage.getItem("remember");

    this.loginForm = this.formBuilder.group({
      mail: [
        remember !== null ? remember : "",
        [Validators.required, ValidationService.emailValidator],
      ],
      password: ["", Validators.required],
      remember: remember !== null,
    });
  }

  ngOnInit(): void {
    this.authService.logout();
    if (localStorage.getItem("RGPD") != "true") {
      const dialogRef = this.dialog.open(RgpdDialogComponent, {
        data: {
          type: "other",
          message: `
          Les informations recueillies vous concernant font l’objet d’un traitement destiné au CESI.
          Les destinataires de ces données sont les membres du personnel administratifs du CESI.
          La durée de conservation des données est de 3 ans.
          Vous bénéficiez d’un droit d’accès, de rectification, de portabilité, d’effacement de celles-ci ou une limitation du traitement.
          Vous pouvez vous opposer au traitement des données vous concernant et disposez du droit de retirer votre consentement à tout moment en vous adressant au CESI.
          Vous avez la possibilité d’introduire une réclamation auprès d’une autorité de contrôle.`,
          buttonText: {
            ok: "Ok",
          },
        },
      });
    }
  }

  public subscribe() {
    this.loginForm.addControl(
      "firstName",
      new FormControl("", Validators.required)
    );
    this.loginForm.addControl(
      "lastName",
      new FormControl("", Validators.required)
    );
    this.loginForm.addControl(
      "confirmPassword",
      new FormControl("", Validators.required)
    );
    this.isSubscribe = true;
  }

  public signIn() {
    this.loginForm.removeControl("firstName");
    this.loginForm.removeControl("lastName");
    this.loginForm.removeControl("confirmPassword");
    this.isSubscribe = false;
  }

  public onSubmit(): void {
    const user = this.loginForm.value;
    user.remember
      ? localStorage.setItem("remember", user.mail)
      : localStorage.removeItem("remember");

    this.loginPending = true;
    this.loginForm.disable();

    if (this.isSubscribe) {
      this.authService
        .register(user)
        .then(() => {
          this.loginPending = false;
          this.loginForm.enable();
          this.router.navigate(["/login"]);
          this.isSubscribe = false;
        })
        .catch((err) => {
          this.loginPending = false;
          this.loginForm.enable();
          this.showError = true;
        });
    } else {
      this.authService
        .login(user)
        .then((token: string) => {
          this.loginPending = false;
          this.loginForm.enable();
          this.router.navigate([""]);
        })
        .catch((err) => {
          this.loginPending = false;
          this.loginForm.enable();
          this.showError = true;
        });
    }
  }
}
