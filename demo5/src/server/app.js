const koa = require('koa');
const app = koa();
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');

const UserController = require('./controller/UserController.js');

const InitController = require('./controller/InitController.js');

app.use(json({ pretty: false, param: 'pretty' }));

app.use(bodyParser());

app.use(UserController.routes()).use(UserController.allowedMethods());

app.use(InitController.routes()).use(InitController.allowedMethods());

app.listen(3002);
