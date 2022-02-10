import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Tag } from "./tag.model";
import { User } from "./user.model";
import { Document } from "src/models/document.model";

export class Project {
  public id: number;
  public title: string;
  public description: string;
  dateStart: Date;
  dateEnd: Date;
  tagsList: Tag[];
  documentsList: Document[];
  collaboratorsList: User[];
  creator: User;
  status: boolean;
  publicAccess: boolean;
  picture: string;

  constructor() {}
}
