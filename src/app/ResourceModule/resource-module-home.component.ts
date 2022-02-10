import { Component, OnInit } from "@angular/core";
import { TypeResource } from "src/models/type-resource.model";
import { ResourceTypeService } from "./ResourceType/resource-type.service";

@Component({
  selector: "app-resource-module-home",
  templateUrl: "./resource-module-home.component.html",
  styleUrls: ["./resource-module-home.component.css"],
})
export class ResourceModuleHomeComponent implements OnInit {
  resourceTypes: TypeResource[];

  constructor(private resourceTypeService: ResourceTypeService) {}

  ngOnInit(): void {
    this.getResourceType();
  }

  getResourceType(): void {
    this.resourceTypeService.getAll().subscribe((data) => {
      this.resourceTypes = data;
    });
  }
}
