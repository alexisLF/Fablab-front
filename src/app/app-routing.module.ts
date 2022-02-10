import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ResourceCapacitationDetailsComponent } from "./ResourceModule/ResourceCapacitation/resourceCapacitation-details/resource-capacitation-details.component";
import { ResourceCapacitationListComponent } from "./ResourceModule/ResourceCapacitation/resourceCapacitation-list/resource-capacitation-list.component";
import { DeliveryStatusDetailsComponent } from "./ResourceModule/DeliveryStatus/delivery-status-details/delivery-status-details.component";
import { DeliveryStatusListComponent } from "./ResourceModule/DeliveryStatus/delivery-status-list/delivery-status-list.component";
import { DocumentationDetailsComponent } from "./ResourceModule/Documentation/documentation-details/documentation-details.component";
import { DocumentationListComponent } from "./ResourceModule/Documentation/documentation-list/documentation-list.component";
import { FileTypeDetailsComponent } from "./ResourceModule/FileType/file-type-details/file-type-details.component";
import { FileTypeListComponent } from "./ResourceModule/FileType/file-type-list/file-type-list.component";
import { MaintenanceDetailsComponent } from "./ResourceModule/Maintenance/maintenance-details/maintenance-details.component";
import { MaintenanceListComponent } from "./ResourceModule/Maintenance/maintenance-list/maintenance-list.component";
import { MaintenanceStatusDetailsComponent } from "./ResourceModule/MaintenanceStatus/maintenance-status-details/maintenance-status-details.component";
import { MaintenanceStatusListComponent } from "./ResourceModule/MaintenanceStatus/maintenance-status-list/maintenance-status-list.component";
import { OperationTypeDetailsComponent } from "./ResourceModule/OperationType/operation-type-details/operation-type-details.component";
import { OperationTypeListComponent } from "./ResourceModule/OperationType/operation-type-list/operation-type-list.component";
import { PurchaseDetailsComponent } from "./ResourceModule/Purchase/purchase-details/purchase-details.component";
import { PurchaseListComponent } from "./ResourceModule/Purchase/purchase-list/purchase-list.component";
import { ResourceModuleHomeComponent } from "./ResourceModule/resource-module-home.component";
import { ResourceDetailsComponent } from "./ResourceModule/Resource/resource-details/resource-details.component";
import { ResourceListComponent } from "./ResourceModule/Resource/resource-list/resource-list.component";
import { ResourceStateDetailsComponent } from "./ResourceModule/ResourceState/resource-state-details/resource-state-details.component";
import { ResourceStateListComponent } from "./ResourceModule/ResourceState/resource-state-list/resource-state-list.component";
import { ResourceTypeDetailsComponent } from "./ResourceModule/ResourceType/resource-type-details/resource-type-details.component";
import { ResourceTypeListComponent } from "./ResourceModule/ResourceType/resource-type-list/resource-type-list.component";
import { RoomDetailsComponent } from "./ResourceModule/Room/room-details/room-details.component";
import { SecurityGearDetailsComponent } from "./ResourceModule/SecurityGear/security-gear-details/security-gear-details.component";
import { SecurityGearListComponent } from "./ResourceModule/SecurityGear/security-gear-list/security-gear-list.component";
import { SiteDetailsComponent } from "./ResourceModule/Site/site-details/site-details.component";
import { SiteListComponent } from "./ResourceModule/Site/site-list/site-list.component";
import { PlanningManagementComponent } from "./CalendarModule/PlanningManagement/planning-management/planning-management.component";
import { ProjectDetailComponent } from "./ProjectModule/Project/project-detail/project-detail.component";
import { ProjectComponent } from "./ProjectModule/Project/project.component";
import { AddProjectComponent } from "./ProjectModule/Project/add-project/add-project.component";

import { LoginModuleComponent } from "./login-module/login-module.component";
import { AuthGuardService } from "./shared/auth/auth-guard.service";
import { ActivateModuleComponent } from "./activate-module/activate-module.component";
import { ResourcesListComponent } from "./CalendarModule/resources-list/resources-list.component";
import { AdminModuleComponent } from "./AdminModule/admin-module/admin-module.component";
import { ForumComponent } from "./forum/forum.component";

const routes: Routes = [
  { path: "", redirectTo: "/resource-home", pathMatch: "full" },
  {
    path: "admin",
    component: AdminModuleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resource-home",
    component: ResourceModuleHomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "project/:id",
    component: ProjectDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "project",
    component: ProjectComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "add-project",
    component: AddProjectComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "add-project/:id",
    component: AddProjectComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "operationtypes",
    component: OperationTypeListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "operationtypes-details",
    component: OperationTypeDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "operationtypes-details/:id",
    component: OperationTypeDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcetypes",
    component: ResourceTypeListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcetypes-details",
    component: ResourceTypeDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcetypes-details/:id",
    component: ResourceTypeDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "filetypes",
    component: FileTypeListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "filetypes-details",
    component: FileTypeDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "filetypes-details/:id",
    component: FileTypeDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "sites",
    component: SiteListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "sites-details",
    component: SiteDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "sites-details/:id",
    component: SiteDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rooms-details",
    component: RoomDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rooms-details/:id",
    component: RoomDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rooms-details/:idSite",
    component: RoomDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "maintenancestatus",
    component: MaintenanceStatusListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "maintenancestatus-details",
    component: MaintenanceStatusDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "maintenancestatus-details/:id",
    component: MaintenanceStatusDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "deliverystatus",
    component: DeliveryStatusListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "deliverystatus-details",
    component: DeliveryStatusDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "deliverystatus-details/:id",
    component: DeliveryStatusDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcestate",
    component: ResourceStateListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcestate-details",
    component: ResourceStateDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcestate-details/:id",
    component: ResourceStateDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcecapacitations",
    component: ResourceCapacitationListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resourcecapacitations-details",
    component: ResourceCapacitationDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "capacitations-details/:id",
    component: ResourceCapacitationDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "securitygears",
    component: SecurityGearListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "securitygears-details",
    component: SecurityGearDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "securitygears-details/:id",
    component: SecurityGearDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "maintenances",
    component: MaintenanceListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "maintenances-details",
    component: MaintenanceDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "maintenances-details/:id",
    component: MaintenanceDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "documentations",
    component: DocumentationListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "documentations-details",
    component: DocumentationDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "documentations-details/:id",
    component: DocumentationDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resources",
    component: ResourceListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resources-list/:id",
    component: ResourceListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resources-details",
    component: ResourceDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resources-details/:id",
    component: ResourceDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "purchases",
    component: PurchaseListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "purchases-details",
    component: PurchaseDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "purchases-details/:id",
    component: PurchaseDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "planningmanagement",
    component: PlanningManagementComponent,
    canActivate: [AuthGuardService],
  },
  { path: "login", component: LoginModuleComponent },
  { path: "activate", component: ActivateModuleComponent },
  {
    path: "resourceslist",
    component: ResourcesListComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'forum', component: ForumComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
