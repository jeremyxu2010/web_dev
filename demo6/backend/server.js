"use strict";

const koa = require('koa');
const serve = require('koa-static');
const sendfile = require('koa-sendfile')
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');

const statAsync = Promise.promisify(fs.stat);

const app = koa();

app.use(serve(__dirname + '/../public'));

app.use(function *(next){
    let p = path.resolve(__dirname, '..', 'public', this.path);
    let stats = null;
    try{
        stats = yield statAsync(p);
    }catch(ignore){}
    if (!stats) {
        try {
            stats = yield sendfile(this, path.resolve(__dirname, '..', 'public', 'index.html'));
        }catch(ignore){}
        if (!stats) this.throw(404);
    }
});

const port = 5000;

app.listen(port);

console.log("server started on port " + port)
