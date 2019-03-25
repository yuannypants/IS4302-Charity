import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as firebase from 'firebase'
import constant from './directory'

let app = express();

require('dotenv').config();

app.set('port',  normalizePort(process.env.APP_PORT || '3000'));
app.set('host',  process.env.APP_HOST || 'localhost');

// View engine (ejs)
// app.set('views', path.join(process.cwd(), 'views')); // /IS4302-Charity/views
// app.set('view engine', 'ejs');

// Middlewares
app.use(cors({ origin: true }));
app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(constant.assetsDir));

// Previous middlewares
// app.use(logger('dev'));
// app.use(cors({ origin: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(process.cwd(), 'public')));

// Initialise Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAIn9kS-Kh3PkUfSTQ--tAgTDptcSNbDyM",
  authDomain: "charity-e8ccd.firebaseapp.com",
  databaseURL: "https://charity-e8ccd.firebaseio.com",
  projectId: "charity-e8ccd",
  storageBucket: "charity-e8ccd.appspot.com",
  messagingSenderId: "212836409307"
});

export default app;

function normalizePort(value) {
  let port = parseInt(value, 10);

  if (isNaN(port)) // named pipe
    return value;

  if (port >= 0) // port number
    return port;

  return false;
}