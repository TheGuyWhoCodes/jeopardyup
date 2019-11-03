const _isDev = window.location.port.indexOf('4200') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};
const apiURI = 'http://157.245.219.215:3000/api/';

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI
};
