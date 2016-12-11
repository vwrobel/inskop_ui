const minilog = require('minilog');

function isClient() {
  return typeof window !== 'undefined';
}

let logInstance = null;

if (isClient()) {
  minilog.enable();
  logInstance = minilog('client');
  const existingErrorLogger = logInstance.error;
  logInstance.error = (err) => {
    existingErrorLogger(err);
  };
} else {
  minilog.suggest.deny(/.*/, process.env.NODE_ENV === 'development' ? 'debug' : 'debug');
  minilog.enable()
    .pipe(minilog.backends.console.formatWithStack)
    .pipe(minilog.backends.console);
  logInstance = minilog('backend');
  const existingErrorLogger = logInstance.error;
  logInstance.error = (err) => {
    existingErrorLogger(err ? err.stack : err);
  };
}

module.exports = logInstance;
