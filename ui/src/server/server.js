import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import log from '../log';
import serverAppRenderer from './serverAppRenderer';

const {
  NODE_ENV,
  PUBLIC_DIR,
  PROD_APP_PORT,
  DEV_APP_PORT,
  DEV_API_PORT
} = process.env;

const port = (NODE_ENV === 'production') ? PROD_APP_PORT : DEV_APP_PORT;

export default function (parameters) {
  process.on('uncaughtException', (ex) => {
    log.error(ex);
    process.exit(1);
  });
  const app = express();
  app.enable('trust proxy');
// Parse bodies as JSON
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(PUBLIC_DIR, { maxAge: '180 days' }));
// This middleware should be last. Return the React app only if no other route is hit.
  app.use(serverAppRenderer);
  app.listen(port, () => {
    log.info(`Node app is running on port ${port}`);
  });
}

