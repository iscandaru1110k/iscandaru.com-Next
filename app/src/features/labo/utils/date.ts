import { MILLISECONDS_PER_DAY } from "../constants/time";

export const calculateDateDiff = (start: string, end: string): number | null => {
  if (!start || !end) return null;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff = endDate.getTime() - startDate.getTime();

  return Math.floor(diff / MILLISECONDS_PER_DAY);
};