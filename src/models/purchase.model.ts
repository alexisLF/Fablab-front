import { DeliveryStatus } from "./delivery-status.model";
import { File } from "./file.model";
import { Resource } from "./resource.model";

export class Purchase {
  public id: number;
  public name: string;
  public purchaseDate: Date;
  public resource: Resource;
  public delivery: DeliveryStatus;
  public filesList: File[];

  constructor() {}
}
