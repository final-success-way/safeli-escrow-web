import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(value: number) {
  return numeral(value).format();
}

export function fCurrency(value: number) {
  const format = value ? numeral(value).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(value: number) {
  const format = value ? numeral(Number(value) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(value: number) {
  const format = value ? numeral(value).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(value: number) {
  const format = value ? numeral(value).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: any, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
