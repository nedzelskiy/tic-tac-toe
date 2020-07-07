import { readFileSync } from 'fs';
import { Mode } from '../common.interfaces';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';

const SERVER_HOST: string = process.env.HOST || 'localhost';
const SERVER_PORT: string = process.env.PORT || '1234';
const SERVER_PROTOCOL: string = process.env.PROTOCOL || 'http';
const SERVER_DOMAIN: string = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
const NODE_ENV: Mode = process.env.NODE_ENV === Mode.PRODUCTION
  ? Mode.PRODUCTION
  : Mode.DEVELOPMENT;

const server: Server = createServer();

server
  .on('request', (req: IncomingMessage, res: ServerResponse): void => {
    try {
      res.statusCode = 200;
      if (req.url == '/') {
        const f: string = readFileSync('./server/index.html', 'utf-8');
        return res.end(f);
      } else if (req.url!.indexOf('/static/') > -1) {
        const fileName = req.url!.split('/').pop();
        const f: string = readFileSync(`./builds/${NODE_ENV}/client/${fileName}`, 'utf-8');
        return res.end(f);
      }
      res.statusCode = 404;
      res.end();
    } catch (e) {
      res.statusCode = 500;
      return res.end(e.toString());
    }
  })
  .listen(
    parseInt(SERVER_PORT, 10),
    SERVER_HOST,
    () => console.log(
      `==> [${process.pid}] SERVER STARTED on ${SERVER_DOMAIN} MODE: ${NODE_ENV}`,
    ),
  );
