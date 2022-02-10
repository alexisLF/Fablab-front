import { MonoTypeOperatorFunction } from "rxjs";
import { MaintenanceStatus } from "./maintenance-status.model";
import { Resource } from "./resource.model";
import { TypeOperation } from "./type-operation.model";

export class Maintenance {
  public id: number;
  public dateStart: Date;
  public dateEnd: Date;
  public resource: Resource;
  public note: string;
  public success: string;
  public type: TypeOperation;
  public status: MaintenanceStatus;

  constructor() {}
}
