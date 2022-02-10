import { Component } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { AuthService } from "./shared/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "FabLabPWA";
  public isLogin: boolean;
  role: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _authService: AuthService
  ) {
    this.role = localStorage.getItem("role")
    this._authService.isLogin.subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    });
  }

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
}
