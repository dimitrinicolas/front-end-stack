# Website starter

Personal website development stack.

Front-end is built on PostCSS, Webpack, Babel, ESLint and Browsersync.

Back-end is build on Node.js and Express.

## Installation

Before using this stack you must first install a few dependencies:

- Node.js: [nodejs.org](https://nodejs.org/en/)
- node modules: `npm install`

## Usage

Run `npm run develop`.

## Config

- `FORCE_HTTPS`: `0|1` If `http://` should redirect to `https://`.
- `PORT`: Website port.
- `PUBLIC_DIR`: Public ressources directory.
- `SSL_CERTIFICATE_FILE`: Path to the SSL certificate pem file.
- `SSL_CERTIFICATE_KEY_FILE`: Path to the SSL certificate key pem file.

## Installation on a Linux server

First install server-side dependencies:

```bash
npm i --production
```

### Starting application using PM2

```bash
npm i -g pm2
pm2 start ecosystem.config.js
pm2 startup
```

### Restarting application

```bash
pm2 restart izifloor
```

### Create an SSL Certificate using Certbot

#### Install Certbot

On Debian 8:

```bash
echo "deb http://ftp.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/backports.list
apt update
apt install certbot -t jessie-backports
```

#### Create the first SSL Certificate

Replace "www.example.com" with your host.

```bash
certbot certonly --standalone -d www.example.com --rsa-key-size 4096
```

#### Set the certificate to the server configuration

Copy the certificate and private key to the application directory, replace "www.example.com" with your host:

```bash
cp /etc/letsencrypt/live/www.example.com/cert.pem cert.pem
cp /etc/letsencrypt/live/www.example.com/privkey.pem key.pem
```

Or set their path into application environment variables.

#### Renew the certificate

```bash
certbot renew
```

#### Auto renew

Every first day of each month at 4 am.

```bash
apt-get install cron
crontab -e
0 4 1 * * "$(command -v bash)" -c '/usr/bin/pm2 stop all && /usr/bin/certbot renew && /usr/bin/pm2 restart all'
```

## License

This project is licensed under the [MIT license](LICENSE).
