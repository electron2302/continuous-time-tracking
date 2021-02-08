import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ViewActivitiesComponent } from './components/view-activities/view-activities.component';
import { ChangeActivityComponent } from './components/change-activity/change-activity.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeActivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category/new',
    component: EditCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category/:id',
    component: EditCategoryComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'activities',
    component: ViewActivitiesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: AuthenticationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
