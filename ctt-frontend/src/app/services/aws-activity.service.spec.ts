import * as TypeMoq from 'typemoq';

import { APIService, CreateActivityInput as APICreateInput } from './API.service';
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
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.createResult));

      await expectAsync(sut.create(MockData.createInput)).toBeResolvedTo(
        MockData.activityResult
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.create(MockData.createInput)).toBeRejectedWith(
        `Could nor insert Activity at starttime ${MockData.activityResult.from.toISOString()}`
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
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
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
          )
        )
        .returns(() => Promise.resolve(MockData.createResult));

      await expectAsync(sut.create(MockData.createInput)).toBeResolvedTo(
        MockData.activityResult
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });

    it('should reject promise on fail', async () => {
      apiMock
        .setup((x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
          )
        )
        .returns(() => Promise.reject());

      await expectAsync(sut.create(MockData.createInput)).toBeRejectedWith(
        `Could nor insert Activity at starttime ${MockData.activityResult.from.toISOString()}`
      );
      apiMock.verify(
        (x) =>
          x.CreateActivity(
            TypeMoq.It.is((val) => (val as APICreateInput) !== null)
          ),
        TypeMoq.Times.once()
      );
    });
  });
});
