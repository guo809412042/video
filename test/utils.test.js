import { intTime2Format } from '../src/utils/format';

test('时间转换', () => {
  expect(intTime2Format(60000)).toBe('1000:00.000');
});
