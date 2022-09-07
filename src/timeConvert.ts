export function secondsToString(t: number): string {
  t = Math.ceil(t);
  const seconds = t % 60;
  const secondsString = AddZeroToNumberString(seconds);
  const minutes = ((t - seconds) / 60) % 60;
  const minutesString = AddZeroToNumberString(minutes);
  const hours = (t - (minutes * 60) - seconds) / (60 * 60);
  const hoursString = AddZeroToNumberString(hours);
  return `${hoursString}:${minutesString}:${secondsString}`;
}

function AddZeroToNumberString(num: number): string {
  return (num >= 10) ? `${num}` : `0${num}`;
}