"use strict";

const DB = require('../dao/DB.js');
const Transaction = require('../dao/Transaction.js');

module.exports = {

    findAll : function *(){
        let db = yield DB;
        let users = yield db.schemas.qUser.qAll();
        return Promise.resolve(users);
    },

    findByUsername : function *(username){
        let db = yield DB;
        let user = yield db.schemas.qUser.qOne({username : username});
        return Promise.resolve(user);
    },

    updateUserPwd : function *(username, pwd){
        let db = yield DB;
        let user = yield db.schemas.qUser.qOne({username : username});
        user.pwd = pwd;
        let transaction = yield Transaction(db);
        try {
            yield user.qSave();
            yield transaction.qCommit();
        } catch (err){
            console.log(err);
            yield transaction.qRollback();
        }
    }
};
