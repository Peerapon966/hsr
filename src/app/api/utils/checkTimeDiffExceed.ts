/**
 * Check if the difference between any two given time points exceeds a specified threshold or not
 * @param {number} threshold The threshold value in minutes. If the threshold is in seconds, provide this parameter as a decimal number.
 * @param {Date} timeOne The first time point as a Date object
 * @param {Date | undefined} timeTwo The second time point as a Date object. If not provided, the current time will be used.
 * @returns Returns true if the difference between the two time points exceeds the threshold, false otherwise.
 */
export function checkTimeDiffExceed(
  threshold: number,
  timeOne: Date,
  timeTwo?: Date
): boolean {
  const timeOneUnix = Math.floor(new Date(timeOne).getTime() / 1000);
  const timeTwoUnix = timeTwo
    ? Math.floor(new Date(timeTwo).getTime() / 1000)
    : Math.floor(new Date().getTime() / 1000);
  const thresholdUnix = threshold * 60;

  if (Math.abs(timeTwoUnix - timeOneUnix) > thresholdUnix) return true;

  return false;
}
