import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

// Angular imports
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ServiceWorkerModule } from "@angular/service-worker";

// Material imports
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatTreeModule } from "@angular/material/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectFilterModule } from "mat-select-filter";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatStepperModule } from "@angular/material/stepper";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from "@angular-material-components/datetime-picker";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppHttpInterceptor } from "../app/interceptors/http.interceptor";
import { FullCalendarModule } from "@fullcalendar/angular";

//Components imports
import { ResourceTypeListComponent } from "./ResourceModule/ResourceType/resource-type-list/resource-type-list.component";
import { ResourceTypeDetailsComponent } from "./ResourceModule/ResourceType/resource-type-details/resource-type-details.component";
import { FileTypeListComponent } from "./ResourceModule/FileType/file-type-list/file-type-list.component";
import { FileTypeDetailsComponent } from "./ResourceModule/FileType/file-type-details/file-type-details.component";
import { SiteListComponent } from "./ResourceModule/Site/site-list/site-list.component";
import { SiteDetailsComponent } from "./ResourceModule/Site/site-details/site-details.component";
import { RoomDetailsComponent } from "./ResourceModule/Room/room-details/room-details.component";
import { OperationTypeListComponent } from "./ResourceModule/OperationType/operation-type-list/operation-type-list.component";
import { OperationTypeDetailsComponent } from "./ResourceModule/OperationType/operation-type-details/operation-type-details.component";
import { MaintenanceStatusListComponent } from "./ResourceModule/MaintenanceStatus/maintenance-status-list/maintenance-status-list.component";
import { MaintenanceStatusDetailsComponent } from "./ResourceModule/MaintenanceStatus/maintenance-status-details/maintenance-status-details.component";
import { PurchaseDetailsComponent } from "./ResourceModule/Purchase/purchase-details/purchase-details.component";
import { environment } from "src/environments/environment";
import { PlanningManagementComponent } from "./CalendarModule/PlanningManagement/planning-management/planning-management.component";
import { CalendarComponent } from "./CalendarModule/calendar/calendar.component";
import { MatNativeDateModule } from "@angular/material/core";
import { InfoEventComponent } from "./CalendarModule/PlanningManagement/info-event/info-event.component";
import { ConfirmationDialogComponent } from "./ProjectModule/modals/confirmation-dialog/confirmation-dialog.component";
import { ProjectDetailComponent } from "./ProjectModule/Project/project-detail/project-detail.component";
import { ProjectComponent } from "./ProjectModule/Project/project.component";
import { AddProjectComponent } from "./ProjectModule/Project/add-project/add-project.component";
import { DeliveryStatusDetailsComponent } from "./ResourceModule/DeliveryStatus/delivery-status-details/delivery-status-details.component";
import { DeliveryStatusListComponent } from "./ResourceModule/DeliveryStatus/delivery-status-list/delivery-status-list.component";
import { DocumentationDetailsComponent } from "./ResourceModule/Documentation/documentation-details/documentation-details.component";
import { DocumentationListComponent } from "./ResourceModule/Documentation/documentation-list/documentation-list.component";
import { ProgressComponent } from "./ResourceModule/Documentation/progress/progress.component";
import { MaintenanceDetailsComponent } from "./ResourceModule/Maintenance/maintenance-details/maintenance-details.component";
import { MaintenanceListComponent } from "./ResourceModule/Maintenance/maintenance-list/maintenance-list.component";
import { PurchaseListComponent } from "./ResourceModule/Purchase/purchase-list/purchase-list.component";
import { ResourceModuleHomeComponent } from "./ResourceModule/resource-module-home.component";
import { ResourceDetailsComponent } from "./ResourceModule/Resource/resource-details/resource-details.component";
import { ResourceListComponent } from "./ResourceModule/Resource/resource-list/resource-list.component";
import { ResourceCapacitationDetailsComponent } from "./ResourceModule/ResourceCapacitation/resourceCapacitation-details/resource-capacitation-details.component";
import { ResourceCapacitationListComponent } from "./ResourceModule/ResourceCapacitation/resourceCapacitation-list/resource-capacitation-list.component";
import { ResourceStateDetailsComponent } from "./ResourceModule/ResourceState/resource-state-details/resource-state-details.component";
import { ResourceStateListComponent } from "./ResourceModule/ResourceState/resource-state-list/resource-state-list.component";
import { SecurityGearDetailsComponent } from "./ResourceModule/SecurityGear/security-gear-details/security-gear-details.component";
import { SecurityGearListComponent } from "./ResourceModule/SecurityGear/security-gear-list/security-gear-list.component";
import { DialogComponent } from "./shared/dialog/dialog.component";
import { DialogService } from "./shared/dialog/dialog.service";
import { AddDocumentComponent } from "./ProjectModule/modals/add-document/add-document.component";
import { LoginModuleComponent } from "./login-module/login-module.component";
import { AuthGuardService } from "./shared/auth/auth-guard.service";
import { InfoComponent } from "./shared/info/info.component";
import { InfoService } from "./shared/info/info.service";
import { ResourcesListComponent } from "./CalendarModule/resources-list/resources-list.component";
import { ActivateModuleComponent } from "./activate-module/activate-module.component";
import { AdminModuleComponent } from "./AdminModule/admin-module/admin-module.component";
import { RgpdDialogComponent } from "./shared/rgpd-dialog/rgpd-dialog.component";
import { ForumComponent } from './forum/forum.component';

@NgModule({
  declarations: [
    AppComponent,
    OperationTypeListComponent,
    OperationTypeDetailsComponent,
    ResourceTypeListComponent,
    ResourceTypeDetailsComponent,
    FileTypeListComponent,
    FileTypeDetailsComponent,
    SiteListComponent,
    SiteDetailsComponent,
    RoomDetailsComponent,
    MaintenanceStatusListComponent,
    MaintenanceStatusDetailsComponent,
    AddProjectComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ConfirmationDialogComponent,
    RgpdDialogComponent,
    DeliveryStatusDetailsComponent,
    DeliveryStatusListComponent,
    ResourceStateListComponent,
    ResourceStateDetailsComponent,
    ResourceCapacitationListComponent,
    ResourceCapacitationDetailsComponent,
    SecurityGearDetailsComponent,
    SecurityGearListComponent,
    MaintenanceListComponent,
    MaintenanceDetailsComponent,
    ResourceModuleHomeComponent,
    DocumentationDetailsComponent,
    DocumentationListComponent,
    ResourceDetailsComponent,
    ResourceListComponent,
    PurchaseDetailsComponent,
    PurchaseListComponent,
    ProgressComponent,
    DialogComponent,
    AppComponent,
    OperationTypeListComponent,
    OperationTypeDetailsComponent,
    ResourceTypeListComponent,
    ResourceTypeDetailsComponent,
    PlanningManagementComponent,
    CalendarComponent,
    InfoEventComponent,
    LoginModuleComponent,
    ActivateModuleComponent,
    AddDocumentComponent,
    LoginModuleComponent,
    AdminModuleComponent,
    InfoComponent,
    ResourcesListComponent,
    ForumComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatTreeModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatChipsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectFilterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatStepperModule,
    NgxMatNativeDateModule,
    FullCalendarModule,
    FormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    DialogService,
    InfoService,
    AuthGuardService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
