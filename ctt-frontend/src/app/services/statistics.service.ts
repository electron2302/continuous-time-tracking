export enum QueryDuration {
  day,
  week,
  month,
  year,
  allTime,
}

export abstract class StatisticsService {
  abstract timePerCategoryAccumulative(
    from: Date,
    to: Date
  ): Promise<{
    data: {
      name: string;
      value: number;
    }[];
    colors: string[];
  }>;

  abstract timePerCategoryPerInterval(
    from: Date,
    to: Date,
    interval: QueryDuration
  ): Promise<{
    data: {
      name: string;
      series: {
        name: string;
        value: number;
      }[];
    }[];
    colors: string[];
  }>;
}
