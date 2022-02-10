import { Resource } from "./resource.model";
import { Site } from "./site.model";

export class Room {
  public id: number;
  public name: string;
  public floor: string;
  public site: Site;
  resourceList: Resource[];

  constructor() {}
}
