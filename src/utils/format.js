//  时间格式转换成 '00:00'
export const intTime2Format = (duration, floatNum = 3) => {
  let min = Math.floor(duration / 60);
  let s = (duration % 60).toFixed(floatNum);
  if (min < 10) {
    min = `0${min}`;
  }
  if (s < 10) {
    s = `0${s}`;
  }
  return `${min}:${s}`;
};
