export function isDevelopment() {
  return (
    location.protocol + '//' + location.hostname + ':' + location.port ===
    'http://localhost:3000'
  );
}
