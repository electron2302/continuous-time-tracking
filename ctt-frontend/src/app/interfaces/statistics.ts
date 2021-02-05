export enum StatisticType {
  RelativeTime,
  AbsoluteTime,
}

export function getDisplayText(statisticType: StatisticType): string {
  switch (statisticType) {
    case StatisticType.RelativeTime:
      return 'Relative time';
    case StatisticType.AbsoluteTime:
      return 'Absolute time';
    default:
      return statisticType;
  }
}

export function iterateStatisticTypes(
  forEach: (statisticType: StatisticType) => void
): void {
  Object.keys(StatisticType)
    .filter((k) => !isNaN(Number(k)))
    .forEach((k: string) => {
      forEach(Number(k));
    });
}
