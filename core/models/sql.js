exports.select = function(table,what,that,callback){
  
    var sql = "SELECT * FROM `"+table+"` WHERE "+what+" = ? order by id desc";
    con.query(sql,[that],function(res,err){
    	if(err){
    		callback(err);
    	}
    	else{
    		callback(res);
    	}
    });  
};
exports.lselect = function(table,what,that,callback){
  
    var sql = "SELECT * FROM `"+table+"` WHERE "+what+" LIKE  ? order by id desc";
    con.query(sql,['%'+that+'%'],function(res,err){
        if(err){
            callback(err);
        }
        else{
            callback(res);
        }
    });  
};
exports.selectAll = function(table,callback){
  
    var sql = "SELECT * FROM `"+table+"";
    con.query(sql,function(res,err){
    	if(err){
    		callback(err);
    	}
    	else{
    		callback(res);
    	}
    });  
};
exports.dselect = function(table,what,that,what1,that1,callback){
  
    var sql = "SELECT * FROM `"+table+"` WHERE "+what+" = ? and "+what1+" = ? order by id desc";
    con.query(sql,[that,that1],function(res,err){
    	if(err){
    		callback(err);
    	}
    	else{
    		callback(res);
    	}
    });  
};
exports.update = function(table,what,that,him,thiss,callback){
    var sql = "update "+table+" set "+what+"= ? where "+him+"= ?";
     con.query(sql,[that,thiss],function(err,res){
        if(err){
            callback(false)
        }
        else{
            callback(true);
        }
     });
}
exports.delete = function(table,what,that,callback){
    var sql = "delete from "+table+" where "+what+"= ?";
     con.query(sql,[that],function(err,res){
        if(err){
            callback(false)
        }
        else{
            callback(true);
        }
     });
}
exports.ddelete = function(table,what,that,what2,that2,callback){
    var sql = "delete from "+table+" where "+what+"= ? and "+what2+" = ?";
     con.query(sql,[that,that2],function(err,res){
        if(err){
            callback(false)
        }
        else{
            callback(true);
        }
     });
}