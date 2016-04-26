"use strict";

const orm = require("orm");
const qOrm = require('q-orm');
const transaction = require('orm-transaction');
const config = require('../config.js');

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
    host:     config.db.host,
    database: config.db.database,
    user:     config.db.user,
    password: config.db.pwd,
    protocol: 'mysql',
    port:     config.db.port,
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
