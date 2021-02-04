import { TestBed } from '@angular/core/testing';

import { AwsCategoryService } from './aws-category.service';

describe('AwsCategoryService', () => {
  let service: AwsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
