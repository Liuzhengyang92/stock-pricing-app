export function getTimeString(timestamp) {
  const year = new Date(timestamp).getFullYear();
  const month = new Date(timestamp).getMonth()+1;
  const day = new Date(timestamp).getDate();
  const hour = new Date(timestamp).getHours();
  const minute = new Date(timestamp).getMinutes();
  const second = new Date(timestamp).getSeconds();
  return `${year}-${month<10?`0${month}`:{month}}-${day<10?`0${day}`:{day}} ${hour<10?`0${hour}`:hour}:${minute<10?`0${minute}`:minute}:${second<10?`0${second}`:second}`;
}