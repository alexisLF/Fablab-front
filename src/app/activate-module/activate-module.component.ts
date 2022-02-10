import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-activate-module',
  templateUrl: './activate-module.component.html',
  styleUrls: ['./activate-module.component.css']
})
export class ActivateModuleComponent implements OnInit {
  private jwt;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
        this.jwt = params['jwt'];
        if (this.jwt != null) {
          await this.authService.activate(this.jwt);
        }
        this.router.navigate(['']);
    });
  }
}
