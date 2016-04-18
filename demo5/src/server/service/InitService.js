"use strict";

const DB = require('../dao/DB.js');

module.exports = {

    initDB : function *(){
        let db = yield DB;
        let schemas = [];
        for(var key in db.schemas) {
            schemas.push(db.schemas[key]);
        }
        yield Promise.all(schemas);
        yield db.qSync();
        let p1 = db.schemas.qUser.qCreate({username : 'jacky', pwd : '123456'});
        let p2 = db.schemas.qUser.qCreate({username : 'tom', pwd : '123456'});
        return Promise.all([p1, p2]);
    }
};
