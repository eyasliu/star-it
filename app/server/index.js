import 'babel-polyfill';
import koa from 'koa';
import env from 'root/config/env';

const app = koa();

app.use(function *(){
  this.body = 'hello';
})

app.listen(env.serverPort, (err) => {
  console.log('server is listenning port: ' + env.serverPort);
})