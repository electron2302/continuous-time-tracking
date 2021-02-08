import * as TypeMoq from 'typemoq';

import { AwsCategoryService } from './aws-category.service';
import { APIService } from './API.service';
import {
  CreateCategoryInput as APICreateInput,
  UpdateCategoryMutation,
} from './API.service';

import * as DummyData from './test-data/aws-category-service-data';

describe('AwsCategoryService', () => {
  let apiMock: TypeMoq.IMock<APIService>;
  let sut: AwsCategoryService;

  beforeEach(() => {
    apiMock = TypeMoq.Mock.ofType(APIService);
    sut = new AwsCategoryService(apiMock.object);
  });

  describe('create', () => {
    it('should accept a CreateCategoryInput', async () => {
      apiMock
        .setup((x) =>
          x.CreateCategory(TypeMoq.It.is((y) => (y as APICreateInput) !== null))
        )
        .returns(() => Promise.resolve(DummyData.createMutation));

      await expectAsync(sut.create(DummyData.categoryInput)).toBeResolvedTo(
        DummyData.categoryValue
      );
      apiMock.verify(
        (x) =>
          x.CreateCategory(
            TypeMoq.It.is((y) => (y as APICreateInput) !== null)
          ),
        TypeMoq.Times.exactly(1)
      );
    });

    it('should reject promise if category could not be created', async () => {
      apiMock
        .setup((x) =>
          x.CreateCategory(TypeMoq.It.is((y) => (y as APICreateInput) !== null))
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.create(DummyData.categoryInput)).toBeRejectedWith(
        `Category ${DummyData.categoryValue.name} could not be added.`
      );
      apiMock.verify(
        (x) =>
          x.CreateCategory(
            TypeMoq.It.is((y) => (y as APICreateInput) !== null)
          ),
        TypeMoq.Times.exactly(1)
      );
    });
  });

  describe('getById', () => {
    it('should reject if no category matches the id', async () => {
      apiMock
        .setup((x) => x.GetCategory(TypeMoq.It.isAnyString()))
        .returns(() => Promise.reject());

      await expectAsync(sut.getById('1')).toBeRejectedWith(
        `Category with id '1' does not exist.`
      );
      apiMock.verify(
        (x) => x.GetCategory(TypeMoq.It.isAnyString()),
        TypeMoq.Times.exactly(1)
      );
    });

    it('should accept if a matching category is found', async () => {
      apiMock
        .setup((x) => x.GetCategory(TypeMoq.It.isAnyString()))
        .returns(() => Promise.resolve(DummyData.queryIdResult));

      await expectAsync(sut.getById('0')).toBeResolvedTo(
        DummyData.categoryValue
      );
      apiMock.verify(
        (x) => x.GetCategory(TypeMoq.It.isAnyString()),
        TypeMoq.Times.exactly(1)
      );
    });
  });

  describe('getAll', () => {
    it('should reject if categories could not be queried', async () => {
      apiMock.setup((x) => x.ListCategorys()).returns((y) => Promise.reject());

      await expectAsync(sut.getAll()).toBeRejectedWith(
        'Failed to query all Categories.'
      );
      apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1));
    });

    it('should accept if no categoried exist', async () => {
      apiMock
        .setup((x) => x.ListCategorys())
        .returns(() => Promise.resolve(DummyData.listIdResultEmpty));

      await expectAsync(sut.getAll()).toBeResolvedTo(
        DummyData.allCategoriesEmpty
      );
      apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1));
    });

    it('should accept if categories were successfully queried (single category)', async () => {
      apiMock
        .setup((x) => x.ListCategorys())
        .returns(() => Promise.resolve(DummyData.listIdResultSingle));

      await expectAsync(sut.getAll()).toBeResolvedTo(
        DummyData.allCategoriesSingle
      );
      apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1));
    });

    it('should accept if categories were successfully queried (multiple categories)', async () => {
      apiMock
        .setup((x) => x.ListCategorys())
        .returns(() => Promise.resolve(DummyData.listIdResult));

      await expectAsync(sut.getAll()).toBeResolvedTo(DummyData.allCategories);
      apiMock.verify((x) => x.ListCategorys(), TypeMoq.Times.exactly(1));
    });
  });

  describe('update', () => {
    it('should reject if update failed', async () => {
      apiMock
        .setup((x) =>
          x.UpdateCategory(
            TypeMoq.It.is((y) => (y as UpdateCategoryMutation) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.update(DummyData.categoryValue)).toBeRejectedWith(
        'Category ResultCategory with id 0 could not be updated.'
      );
      apiMock.verify(
        (x) =>
          x.UpdateCategory(
            TypeMoq.It.is((y) => (y as UpdateCategoryMutation) !== null)
          ),
        TypeMoq.Times.exactly(1)
      );
    });

    it('should accept if update succeeded', async () => {
      apiMock
        .setup((x) =>
          x.UpdateCategory(
            TypeMoq.It.is((y) => (y as UpdateCategoryMutation) !== null)
          )
        )
        .returns(() => Promise.resolve(DummyData.updateCategory));

      await expectAsync(sut.update(DummyData.categoryValue)).toBeResolved();
      apiMock.verify(
        (x) =>
          x.UpdateCategory(
            TypeMoq.It.is((y) => (y as UpdateCategoryMutation) !== null)
          ),
        TypeMoq.Times.exactly(1)
      );
    });
  });
});
