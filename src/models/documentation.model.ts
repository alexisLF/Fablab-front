import { File } from "./file.model";

export class Documentation {
  public id: number;
  public description: string;
  public useCondition: string;
  public filesList: File[];

  constructor() {}
}
