import { TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';
import { APIService } from './API.service';
import { CreateCategoryInput } from './category.service'

import { AwsCategoryService } from './aws-category.service';
import { CreateCategoryInput as APICreateInput } from './API.service';
import { CreateCategoryMutation as APICreateMutation } from './API.service';

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
    it('should accept a CreateCategoryInput', () => {
      const mut: APICreateMutation = {
        color: '#000000',
        name: 'TestCat',excludeFromStatistics: [],
        reminderInterval: 10,
        activities: null,
        __typename: 'Category',
        id: '1',
        createdAt: '',
        owner: null,
        _deleted: false,
        _lastChangedAt: 0,
        _version: 1,
        updatedAt: ''
      };

      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock.setup(x => x.CreateCategory(TypeMoq.It.is(y => (y as APICreateInput) !== null))).returns((y) => Promise.resolve(mut));
      const category: CreateCategoryInput = {
        color: '#00000',
        name: 'TestCat',
        excludeFromStatistics: [],
        reminderInterval: 10
      };
      const sut = new AwsCategoryService(apiMock.object);

      sut.create(category);

      expect(apiMock.verify(x => x.CreateCategory(TypeMoq.It.isAny()), TypeMoq.Times.exactly(1))).toBeUndefined();
    });

    it('should reject promise if category could not be created', async function() {
      const apiMock = TypeMoq.Mock.ofType(APIService);
      apiMock.setup(x => x.CreateCategory(TypeMoq.It.is(y => (y as APICreateInput) !== null))).returns((y) => Promise.reject());
      const category: CreateCategoryInput = {
        color: '#000000',
        name: 'TestCat',
        excludeFromStatistics: [],
        reminderInterval: 10
      };
      const sut = new AwsCategoryService(apiMock.object);

      await expectAsync(sut.create(category)).toBeRejectedWith('Category TestCat could not be added');
      expect(apiMock.verify(x => x.CreateCategory(TypeMoq.It.isAny()), TypeMoq.Times.exactly(1))).toBeUndefined();
    });
  });

  describe('getById', () => {
    it('should ', () => {

    });

    it('should ', () => {

    });
  });

  describe('getAll', () => {
    it('should ', () => {

    });

    it('should ', () => {

    });
  });

  describe('update', () => {
    it('should ', () => {

    });

    it('should ', () => {

    });
  });
});
