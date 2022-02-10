import { Room } from "./room.model";

export class Site {
  public id: number;
  public name: string;
  public description: string;
  roomList: Room[];

  constructor() {}
}
