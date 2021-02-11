import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
// @ts-ignore
import awsconfig from '../aws-exports';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { APIService } from './services/API.service';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AwsCategoryService } from './services/aws-category.service';
import { CategoryService } from './services/category.service';
import { AwsStatisticsService } from './services/aws-statistics.service';
import { StatisticsService } from './services/statistics.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewActivitiesComponent } from './components/view-activities/view-activities.component';
import { ElementActivityComponent } from './components/element-activity/element-activity.component';
import { ActivityService } from './services/activity.service';
import { AwsActivityService } from './services/aws-activity.service';
import { ChangeActivityComponent } from './components/change-activity/change-activity.component';
import { ViewCategoriesComponent } from './components/view-categories/view-categories.component';
import { AccountComponent } from './components/account/account.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { EditActivityPreviewComponent } from './components/edit-activity-preview/edit-activity-preview.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';

const materialModules = [
  CdkTreeModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  MatBadgeModule,
  MatGridListModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule,
];

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    EditCategoryComponent,
    ViewActivitiesComponent,
    ElementActivityComponent,
    ChangeActivityComponent,
    ViewCategoriesComponent,
    AccountComponent,
    StatisticsComponent,
    LoadingComponent,
    PieChartComponent,
    BarChartComponent,
    EditActivityComponent,
    EditActivityPreviewComponent,
  ],
  imports: [
    AmplifyUIAngularModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxMatColorPickerModule,
    NgxChartsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ...materialModules,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    { provide: ActivityService, useClass: AwsActivityService },
    { provide: CategoryService, useClass: AwsCategoryService },
    { provide: StatisticsService, useClass: AwsStatisticsService },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    { provide: 'boolean', useValue: true },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    APIService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
