"use strict";

const Router = require('koa-router');

const InitService = require('../service/InitService.js');

const InitController = new Router({
  prefix: '/init'
});

InitController.get('/', function *(){
    yield InitService.initDB();
    this.body = {success : true};
});

module.exports = InitController;
