import { Injectable } from '@angular/core';
import { Category } from 'src/models';
import { CategoryService, CreateCategoryInput } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class AwsCategoryService implements CategoryService {

  constructor() { }
  create(input: CreateCategoryInput): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  update(category: Category): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
