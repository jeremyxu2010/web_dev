module.exports = function(db){
    return new Promise(function(resolve, reject){
        db.transaction(function (err, t) {
            if(!err){
                resolve({
                    qCommit : function (){
                        return new Promise(function(resolve2, reject2){
                            t.commit(function(err){
                                if(!err){
                                    resolve2();
                                } else {
                                    reject2(err);
                                }
                            });
                        });
                    },
                    qRollback : function (){
                        return new Promise(function(resolve2, reject2){
                            t.rollback(function(err){
                                if(!err){
                                    resolve2();
                                } else {
                                    reject2(err);
                                }
                            });
                        });
                    }
                });
            } else {
                reject(err);
            }
        });
    });
};
