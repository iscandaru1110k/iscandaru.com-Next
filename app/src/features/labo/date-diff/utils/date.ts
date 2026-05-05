import { DateParts } from "@/features/labo/types/date";
import { MILLISECONDS_PER_DAY } from "@/features/labo/constants/time";

/**
 * 二つの日付から差分の日数を計算する
 * @param start - 開始日
 * @param end - 終了日
 * @returns 日数差分
 */
export const calculateDateDiff = (start: Date, end: Date): number | null => {
  if (!start || !end) return null;

  const diff = end.getTime() > start.getTime()
    ? end.getTime() - start.getTime()
    : start.getTime() - end.getTime()

  return Math.floor(diff / MILLISECONDS_PER_DAY);
};

/**
 * 月の選択肢を取得する
 * @returns 非ゼロ埋めの月の選択肢
 */
export const getMonthOptions = (): string[] => {
  return Array.from({ length: 12 }, (_, i) =>
    String(i + 1),
  );
};

/**
 * 日の選択肢を取得する
 * @param year - 年
 * @param month - 月
 * @returns 非ゼロ埋めの日の選択肢
 */
export const getDayOptions = (
  year?: string,
  month?: string,
): string[] => {
  if (!year || !month) {
    return Array.from({ length: 31 }, (_, i) =>
      String(i + 1),
    );
  }

  const y = Number(year);
  const m = Number(month);

  // JS Dateのテクニック：翌月0日 = 当月末日
  const lastDay = new Date(y, m, 0).getDate();

  return Array.from({ length: lastDay }, (_, i) =>
    String(i + 1),
  );
};

/**
 * 日付が有効かどうかを判定する
 * @param y - 年
 * @param m - 月
 * @param d - 日
 * @returns 有効かどうか
 */
export const isValidDate = (y: string, m: string, d: string): boolean => {
  if (!y || !m || !d) return false;

  const date = new Date(`${y}-${m}-${d}`);

  return (
    !isNaN(date.getTime()) &&
    date.getFullYear() === Number(y) &&
    date.getMonth() + 1 === Number(m) &&
    date.getDate() === Number(d)
  );
};

/**
 * 年の入力を正規化する
 * @param value - 入力値
 * @returns 正規化された年の入力値
 */
export const normalizeYearInput = (value: string): string => {
  return value.replace(/[^0-9]/g, "").slice(0, 4);
};

/**
 * 年の入力が範囲内かどうかを判定する
 * @param year - 年の入力値
 * @param minYear - 最小年
 * @param maxYear - 最大年
 * @returns 範囲内かどうか
 */
export const isYearInRange = (
  year: string,
  minYear: number,
  maxYear: number,
): boolean => {
  return Number(year) >= minYear && Number(year) <= maxYear;
};

/**
 * 日付パーツをDateオブジェクトに変換する
 * @param parts - 日付パーツ
 * @returns Dateオブジェクト
 */
export const toDate = (parts: DateParts): Date | null => {
  if (!parts.year || !parts.month || !parts.day) return null;

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);

  if ([year, month, day].some((value) => Number.isNaN(value))) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  // JS Dateの0-99年補正(1900足し)を打ち消し、入力年をそのまま扱う
  if (year >= 0 && year <= 99) {
    date.setFullYear(year);
  }

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};