export enum StatisticType {
  relativeTime,
  absoluteTime,
}

export const getDisplayText: (statisticType: StatisticType) => string = (
  statisticType: StatisticType
) => {
  switch (statisticType) {
    case StatisticType.relativeTime:
      return 'Relative time';
    case StatisticType.absoluteTime:
      return 'Absolute time';
    default:
      return statisticType;
  }
};

export const iterateStatisticTypes: (
  forEach: (statisticType: StatisticType) => void
) => void = (forEach: (statisticType: StatisticType) => void) => {
  Object.keys(StatisticType)
    .filter((k) => !isNaN(Number(k)))
    .forEach((k: string) => {
      forEach(Number(k));
    });
};
