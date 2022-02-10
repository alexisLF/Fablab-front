import { RouterLink } from "@angular/router";
import { GroupedObservable } from "rxjs";
import { Group } from "./group.model";
import { Role } from "./role.model";

export class User {
  public id: number;
  public mail: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public active: boolean;
  public dateActive: Date;
  public avatar: string;
  public credit: number;
  public group: Group;
  public role: Role;
  constructor() {}
}
