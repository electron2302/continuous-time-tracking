import * as TypeMoq from 'typemoq';

import {
  APIService,
  CreateActivityInput,
  UpdateActivityInput,
  DeleteActivityInput,
} from './API.service';
import { AwsActivityService } from './aws-activity.service';
import * as MockData from './test-data/aws-activity-service-data';

describe('AwsActivityService', () => {
  let apiMock: TypeMoq.IMock<APIService>;
  let sut: AwsActivityService;

  beforeEach(() => {
    apiMock = TypeMoq.Mock.ofType(APIService);
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
});
