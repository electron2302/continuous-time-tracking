import { TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';
import { APIService } from './API.service';

import { AwsCategoryService } from './aws-category.service';
import { CreateCategoryInput as APICreateInput } from './API.service';
import * as DummyData from './test-data/aws-category-service-data';

describe('AwsCategoryService', () => {
  let service: AwsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should accept a CreateCategoryInput', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock
        .setup((x) =>
          x.CreateCategory(TypeMoq.It.is((y) => (y as APICreateInput) !== null))
        )
        .returns((y) => Promise.resolve(DummyData.createMutation));
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.create(DummyData.categoryInput)).toBeResolved();
      expect(
        apiMock.verify(
          (x) => x.CreateCategory(TypeMoq.It.isAny()),
          TypeMoq.Times.exactly(1)
        )
      ).toBeUndefined();
    });

    it('should reject promise if category could not be created', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock
        .setup((x) =>
          x.CreateCategory(TypeMoq.It.is((y) => (y as APICreateInput) !== null))
        )
        .returns((y) => Promise.reject());
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.create(DummyData.categoryInput)).toBeRejectedWith(
        'Category TestCat could not be added.'
      );
      expect(
        apiMock.verify(
          (x) => x.CreateCategory(TypeMoq.It.isAny()),
          TypeMoq.Times.exactly(1)
        )
      ).toBeUndefined();
    });
  });

  describe('getById', () => {
    it('should reject if no category matches the id', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock
        .setup((x) => x.GetCategory(TypeMoq.It.isAnyString()))
        .returns((y) => Promise.reject());
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.getById('1')).toBeRejectedWith(
        `Category with id '1' does not exist.`
      );
      expect(
        apiMock.verify(
          (x) => x.GetCategory(TypeMoq.It.isAnyString()),
          TypeMoq.Times.exactly(1)
        )
      ).toBeUndefined();
    });

    it('should accept if a matching category is found', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock
        .setup((x) => x.GetCategory(TypeMoq.It.isAnyString()))
        .returns((y) => Promise.resolve(DummyData.queryIdResult));
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.getById('0')).toBeResolvedTo(
        DummyData.categoryResult
      );
      expect(
        apiMock.verify(
          (x) => x.GetCategory(TypeMoq.It.isAnyString()),
          TypeMoq.Times.exactly(1)
        )
      ).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('should reject if categories could not be queried', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock.setup((x) => x.ListCategorys()).returns((y) => Promise.reject());
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.getAll()).toBeRejectedWith(
        'Failed to query all Categories.'
      );
      expect(
        apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1))
      ).toBeUndefined();
    });

    it('should accept if no categoried exist', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock
        .setup((x) => x.ListCategorys())
        .returns((y) => Promise.resolve(DummyData.listIdResultEmpty));
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.getAll()).toBeResolvedTo(
        DummyData.allCategoriesEmpty
      );
      expect(
        apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1))
      ).toBeUndefined();
    });

    it('should accept if categories were successfully queried (single category)', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock
        .setup((x) => x.ListCategorys())
        .returns((y) => Promise.resolve(DummyData.listIdResultSingle));
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.getAll()).toBeResolvedTo(
        DummyData.allCategoriesSingle
      );
      expect(
        apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1))
      ).toBeUndefined();
    });

    it('should accept if categories were successfully queried (multiple categories)', async () => {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock
        .setup((x) => x.ListCategorys())
        .returns((y) => Promise.resolve(DummyData.listIdResult));
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.getAll()).toBeResolvedTo(DummyData.allCategories);
      expect(
        apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1))
      ).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should ', () => {});

    it('should ', () => {});
  });
});
