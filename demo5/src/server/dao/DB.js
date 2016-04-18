"use strict";

const orm = require("orm");
const qOrm = require('q-orm');
const transaction = require("orm-transaction");

function defineSchemas(db){
    db.schemas = {
        qUser : db.qDefine("users", {
            id : Number,
            username      : String,
            pwd   : String
        })
    };
}

const DB = qOrm.qConnect({
    host:     '127.0.0.1',
    database: 'test',
    user:     'root',
    password: '123456',
    protocol: 'mysql',
    port:     '3306',
    query:    {
        reconnect : true,
        pool: true,
        debug: false
    }
}).then(function (db) {
    db.use(transaction);
    defineSchemas(db);
    return db;
}).fail(function (err) {
    throw err;
});

module.exports = DB;
