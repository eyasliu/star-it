import 'babel-polyfill';
import './config';
import koa from 'koa';
import env from 'root/config/env';
import api from './api';

const app = koa();

app.use(api);
app.listen(env.serverPort, (err) => {
  console.log('server is listenning port: ' + env.serverPort);
})