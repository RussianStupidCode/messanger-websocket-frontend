import moment from 'moment';

export function dateFormat(timeStamp) {
  return moment.unix(timeStamp).format('YYYY-MM-DD HH:mm:ss');
}

export function empty() {
  console.log('empty');
}
