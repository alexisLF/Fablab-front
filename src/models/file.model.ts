import { Resource } from "./resource.model";
import { TypeFile } from "./type-file.model";

export class File {
  public id: number;
  public name: string;
  public url: string;
  public dateUpload: Date;
  public type: TypeFile;

  constructor() {}
}
