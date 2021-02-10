import { Observable } from 'zen-observable-ts';
import * as TypeMoq from 'typemoq';

import {
  APIService,
  CreateActivityInput,
  UpdateActivityInput,
  DeleteActivityInput,
  ModelActivityFilterInput,
} from './API.service';
import { AwsActivityService } from './aws-activity.service';
import * as MockData from './test-data/aws-activity-service-data';

describe('AwsActivityService', () => {
  let apiMock: TypeMoq.IMock<APIService>;
  let sut: AwsActivityService;

  beforeEach(() => {
    apiMock = TypeMoq.Mock.ofType(APIService, TypeMoq.MockBehavior.Loose, true);

    sut = new AwsActivityService(apiMock.object);
  });

  describe('createActivity', () => {
    it('should resolve promise on success', async () => {
      apiMock
        .setup((x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.createResult));

      await expectAsync(sut.create(MockData.createInput)).toBeResolvedTo(
        MockData.activityResult
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.create(MockData.createInput)).toBeRejectedWith(
        `Could nor insert Activity at starttime ${MockData.activityResult.from.toISOString()}`
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });
  });

  describe('insertActivity', () => {
    it('should resolve promise on success', async () => {
      apiMock
        .setup((x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.createResult));

      await expectAsync(sut.create(MockData.createInput)).toBeResolvedTo(
        MockData.activityResult
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.create(MockData.createInput)).toBeRejectedWith(
        `Could nor insert Activity at starttime ${MockData.activityResult.from.toISOString()}`
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as CreateActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });
  });

  describe('updateActivity', () => {
    it('should resolve promise on success', async () => {
      apiMock
        .setup((x) =>
          x.UpdateActivity(
            TypeMoq.It.is((val) => (val as UpdateActivityInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.updateResult));

      await expectAsync(sut.update(MockData.activityResult)).toBeResolved();
      apiMock.verify(
        (x) =>
          x.UpdateActivity(
            TypeMoq.It.is((val) => (val as UpdateActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.UpdateActivity(
            TypeMoq.It.is((val) => (val as UpdateActivityInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.update(MockData.activityResult)).toBeRejectedWith(
        `Could not update activity from ${MockData.activityResult.from.toISOString()}`
      );
      apiMock.verify(
        (x) =>
          x.UpdateActivity(
            TypeMoq.It.is((val) => (val as UpdateActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });
  });

  describe('deleteActivity', () => {
    it('should resolve promise on success', async () => {
      apiMock
        .setup((x) =>
          x.DeleteActivity(
            TypeMoq.It.is((val) => (val as DeleteActivityInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.updateResult));

      await expectAsync(sut.delete(MockData.activityResult)).toBeResolved();
      apiMock.verify(
        (x) =>
          x.DeleteActivity(
            TypeMoq.It.is((val) => (val as DeleteActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.DeleteActivity(
            TypeMoq.It.is((val) => (val as DeleteActivityInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.delete(MockData.activityResult)).toBeRejectedWith(
        `Could not delete activity from ${MockData.activityResult.from.toISOString()}`
      );
      apiMock.verify(
        (x) =>
          x.DeleteActivity(
            TypeMoq.It.is((val) => (val as DeleteActivityInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });
  });

  describe('getAll', () => {
    it('should resolve promise on success (no activities)', async () => {
      apiMock
        .setup((x) => x.ListActivitys())
        .returns(() => Promise.resolve(MockData.activityApiListEmpty));

      await expectAsync(sut.getAll()).toBeResolvedTo(
        MockData.activityListEmpty
      );
      apiMock.verify((x) => x.ListActivitys(), TypeMoq.Times.once());
    });

    it('should resolve promise on success (one activity)', async () => {
      apiMock
        .setup((x) => x.ListActivitys())
        .returns(() => Promise.resolve(MockData.activityApiListSingle));

      await expectAsync(sut.getAll()).toBeResolvedTo(
        MockData.activityListSingle
      );
      apiMock.verify((x) => x.ListActivitys(), TypeMoq.Times.once());
    });

    it('should resolve promise on success (multiple activities)', async () => {
      apiMock
        .setup((x) => x.ListActivitys())
        .returns(() => Promise.resolve(MockData.activityApiListMulti));

      await expectAsync(sut.getAll()).toBeResolvedTo(
        MockData.activityListMulti
      );
      apiMock.verify((x) => x.ListActivitys(), TypeMoq.Times.once());
    });

    it('should reject promise on fail', async () => {
      apiMock.setup((x) => x.ListActivitys()).returns(() => Promise.reject());

      await expectAsync(sut.getAll()).toBeRejectedWith(
        `Could not query activities.`
      );
      apiMock.verify((x) => x.ListActivitys(), TypeMoq.Times.once());
    });
  });

  describe('getById', () => {
    it('should resolve promise on success', async () => {
      apiMock
        .setup((x) => x.GetActivity(TypeMoq.It.isAnyString()))
        .returns(() => Promise.resolve(MockData.getActivity));

      await expectAsync(sut.getById('1')).toBeResolvedTo(
        MockData.activityResult
      );
      apiMock.verify(
        (x) => x.GetActivity(TypeMoq.It.isAnyString()),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) => x.GetActivity(TypeMoq.It.isAnyString()))
        .returns(() => Promise.reject());

      await expectAsync(sut.getById('1')).toBeRejectedWith(
        `Could not get activity with id 1`
      );
      apiMock.verify(
        (x) => x.GetActivity(TypeMoq.It.isAnyString()),
        TypeMoq.Times.once()
      );
    });
  });

  describe('getByCategory', () => {
    it('should resolve promise on success (no activities)', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.activityApiListEmpty));

      await expectAsync(
        sut.getByCategory(MockData.filterCategroy)
      ).toBeResolvedTo(MockData.activityListEmpty);
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should resolve promise on success (one activity)', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.activityApiListSingle));

      await expectAsync(
        sut.getByCategory(MockData.filterCategroy)
      ).toBeResolvedTo(MockData.activityListSingle);
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should resolve promise on success (multiple activities)', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.activityApiListSingle));

      await expectAsync(
        sut.getByCategory(MockData.filterCategroy)
      ).toBeResolvedTo(MockData.activityListSingle);
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(
        sut.getByCategory(MockData.filterCategroy)
      ).toBeRejectedWith(`Could not query activities for category TestCat.`);
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });
  });

  describe('getBetween', () => {
    it('should resolve promise on success (no activities)', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.activityApiListEmpty));

      await expectAsync(
        sut.getBetween(MockData.fromDate, MockData.toDate)
      ).toBeResolvedTo(MockData.activityListEmpty);
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should resolve promise on success (one activity)', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.activityApiListSingle));

      await expectAsync(
        sut.getBetween(MockData.fromDate, MockData.toDate)
      ).toBeResolvedTo(MockData.activityListSingle);
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should resolve promise on success (multiple activities)', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.activityApiListMulti));

      await expectAsync(
        sut.getBetween(MockData.fromDate, MockData.toDate)
      ).toBeResolvedTo(MockData.activityListMulti);
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(
        sut.getBetween(MockData.fromDate, MockData.toDate)
      ).toBeRejectedWith(
        `Could not query activities between ${MockData.fromDate.toISOString()} and ${MockData.toDate.toISOString()}.`
      );
      apiMock.verify(
        (x) =>
          x.ListActivitys(
            TypeMoq.It.is((y) => (y as ModelActivityFilterInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });
  });
});
