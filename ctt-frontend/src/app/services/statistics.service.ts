export enum QueryDuration {
  day,
  week,
  month,
  year,
  allTime,
}

export abstract class StatisticsService {
  /**
   * Get the categoryID to the absolute
   * distribution of it's occurence.
   *
   * @param durationTyp, the duration to calculate the distibution.
   * @param durationValue, the count of the discrete durations to analyze.
   */
  abstract getAbsoluteCategoryTime(
    durationType: QueryDuration,
    durationValue: number
  ): Promise<Map<string, number>>;

  /**
   * Get the categoryID to the relative
   * distribution of it's occurence.
   *
   * @param durationType, the duration to calculate the distibution.
   * @param durationValue, the count of the discrete durations to analyze.
   */
  abstract getRelativeCategoryTime(
    durationType: QueryDuration,
    durationValue: number
  ): Promise<Map<string, number>>;
}
