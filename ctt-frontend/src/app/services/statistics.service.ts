export enum QueryDuration {
  Day,
  Week,
  Month,
  Year,
  AllTime,
}

export interface StatisticsService {
  getAbsoluteCategoryTime(
    durationType: QueryDuration,
    durationValue: number
  ): Promise<Map<string, number>>;

  getRelativeCategoryTime(
    durationType: QueryDuration,
    durationValue: number
  ): Promise<Map<string, number>>;
}
