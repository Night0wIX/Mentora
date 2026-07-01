const RELATIVE_TIME_DIVISIONS: {
  amount: number;
  unit: Intl.RelativeTimeFormatUnit;
}[] = [
  { amount: 60, unit: "seconds" },
  { amount: 60, unit: "minutes" },
  { amount: 24, unit: "hours" },
  { amount: 7, unit: "days" },
  { amount: 4.34524, unit: "weeks" },
  { amount: 12, unit: "months" },
  { amount: Number.POSITIVE_INFINITY, unit: "years" },
];

const JUST_NOW_THRESHOLD_S = 60;

export interface RelativeDate {
  relative: string;
  dateTime: string;
}

export function formatRelativeDate(
  isoDate: string,
  locale = "en",
): RelativeDate {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`formatRelativeDate: invalid ISO date "${isoDate}"`);
  }

  const dateTime = date.toISOString();
  let duration = (date.getTime() - Date.now()) / 1000;

  if (Math.abs(duration) < JUST_NOW_THRESHOLD_S) {
    return { relative: "Just now", dateTime };
  }

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

  for (const division of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return {
        relative: formatter.format(Math.round(duration), division.unit),
        dateTime,
      };
    }
    duration /= division.amount;
  }

  return {
    relative: formatter.format(Math.round(duration), "years"),
    dateTime,
  };
}
