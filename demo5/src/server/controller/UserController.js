"use strict";

const Router = require('koa-router');

const UserService = require('../service/UserService.js');

const UserController = new Router({
  prefix: '/users'
});

UserController.get('/', function *(){
    let users = yield UserService.findAll();
    this.body = users;
});

UserController.get('/:username', function *(){
    let user = yield UserService.findByUsername(this.params.username);
    this.body = user;
});

UserController.post('/:username', function *(){
    yield UserService.updateUserPwd(this.params.username, this.request.body.pwd);
    this.body = {success : true};
});

module.exports = UserController;

