import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss'],
})
export class ViewCategoriesComponent implements OnInit {
  public categories: Category[] = [];

  public loading = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getAll();
    this.loading = false;
  }

  public navigateToEdit(id: string): void {
    this.router.navigate([`category/${id}`]);
  }
}
