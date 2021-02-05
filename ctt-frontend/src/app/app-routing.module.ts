import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

const routes: Routes = [
  { path: 'category/new', component: EditCategoryComponent },
  { path: 'category/:id', component: EditCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
