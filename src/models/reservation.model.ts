import { Resource } from "./resource.model";
import { User } from "./user.model";

export class Reservation {
  public id: number;
  public title: String;
  public description: String;
  public priority: number;
  private user: User;
  public dateStart: string;
  public dateEnd: string;
  public resource: Resource;

  constructor() {}
}
