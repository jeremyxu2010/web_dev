"use strict";

const DB = require('../dao/DB.js');
const DBTransaction = require('../dao/DBTransaction.js');

module.exports = {

    findAll : function *(){
        let db = yield DB();
        let users = yield db.schemas.qUser.qAll();
        return Promise.resolve(users);
    },

    findByUsername : function *(username){
        let db = yield DB();
        let user = yield db.schemas.qUser.qOne({username : username});
        return Promise.resolve(user);
    },

    updateUserPwd : function *(username, pwd){
        let db = yield DB();
        let dbTransaction = yield DBTransaction(db);
        let user = yield db.schemas.qUser.qOne({username : username});
        user.pwd = pwd;
        try {
            yield user.qSave();
            yield dbTransaction.qCommit();
        } catch (err){
            console.log(err);
            yield dbTransaction.qRollback();
        }
    }
};
