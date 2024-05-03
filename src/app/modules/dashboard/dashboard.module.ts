import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboadHomeComponent } from './page/dashboad-home/dashboad-home.component';
import { RouterModule } from '@angular/router';
import { dashboard_routes } from './dashboard.routing';
import { SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    DashboadHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(dashboard_routes),
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    CookieService
  ]
})
export class DashboardModule { }
