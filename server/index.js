const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { red, yellow } = require('kleur');

let isHttpsListening = false;

const {
  FORCE_HTTPS,
  PORT,
  PUBLIC_DIR,
  SSL_CERTIFICATE_FILE,
  SSL_CERTIFICATE_KEY_FILE
} = require('../config');

const server = express();

server.use(morgan('common'));
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());

/** Force HTTPS middleware */
server.get('*', (req, res, next) => {
  if (
    !(req.secure || req.headers['x-forwarded-proto'] === 'https') &&
    FORCE_HTTPS &&
    isHttpsListening
  ) {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

/** Serving static website */
server.use('/', express.static(path.join(__dirname, '..', PUBLIC_DIR)));

/** Serving HTTP Application */
http.createServer(server).listen(PORT, error => {
  if (error) {
    console.error(red(`Error while trying to listen on port ${PORT}.`));
    return;
  }
  console.log(`HTTP listening on port ${PORT}.`);
});

/** Serving HTTPS Application if certificate found */
if (
  fs.existsSync(SSL_CERTIFICATE_FILE) &&
  fs.existsSync(SSL_CERTIFICATE_KEY_FILE)
) {
  https
    .createServer(
      {
        cert: fs.readFileSync(SSL_CERTIFICATE_FILE, 'utf8'),
        key: fs.readFileSync(SSL_CERTIFICATE_KEY_FILE, 'utf8')
      },
      server
    )
    .listen(443, error => {
      if (error) {
        console.error(red('Error while trying to listen on port 443.'));
        return;
      }
      isHttpsListening = true;
      console.log('HTTPS listening on port 443.');
    });
} else {
  console.error(yellow('No SSL certificate found, see documentation.'));
}
