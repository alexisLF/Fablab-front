import { Documentation } from "./documentation.model";
import { ResourceCapacitation } from "./resource-capacitation.model";
import { ResourceState } from "./resource-state.model";
import { Room } from "./room.model";
import { SecurityGear } from "./security-gear.model";
import { TypeResource } from "./type-resource.model";

export class Resource {
  public id: number;
  public name: string;
  public ref: string;
  public dateInstallation: Date;
  public stock: number;
  public isActive: boolean;
  public type: TypeResource;
  public room: Room;
  public state: ResourceState;
  public documentation: Documentation;
  public securitysList: SecurityGear[];
  public consumableResources: Resource[];
  public resourceCapacitationList: ResourceCapacitation;
  public picture: string;
  constructor() {}
}
