exports.makeAdmin = function(user_id,callback){
    sql.update('users','rule',1,'id',user_id,function(data){
    	if(data){
    		callback(data);
    	}
    	else{
    		callback(data);
    	}
    });
}

exports.pay_per_month = function(user_id,months,callback){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); //January is 0!
var yyyy = today.getFullYear();
var day = yyyy+"-"+mm+"-"+dd;
sql.select('users','id',user_id,function(data){
	//if the user still has paid time ----->
	if(moment(data[0].pay).isAfter(day)){
		var new_date = addSubtractDate.add(data[0].pay, months, "months");
	}
	else{
		var new_date = addSubtractDate.add(today, months, "months");
	}
	sql.update('users','pay',new_date,'id',user_id,function(data){
		if(data){
			callback(true);
		}
		else{
			callback(false);
		}
	})
});
}


exports.edit_group_name = function(group_id,name,callback){
	sql.update('groups','name',name,'id',group_id,function(data){
		if(data){
			callback(true);
		}
		else{
			callback(false);
		}
	})
}
exports.add_group = function(name,callback){
	var sql = "insert into groups(name) values(?)";
	con.query(sql,[name],function(err,res){
		if(err){
			callback(false);
		}
		else{
			callback(true);
		}
	})
}
exports.block = function(user_id,callback){
	sql.update('users','work','0','id',user_id,function(data){
		callback(data);
	})
}
exports.unblock = function(user_id,callback){
	sql.update('users','work',1,'id',user_id,function(data){
		callback(data);
	})
}
exports.addUser = function(name,email,password,callback){
	con.query('insert into users(name,email,password) values(?,?,?)',[name,email,password],function(err,res){
			if(err){
				callback(false);
			}
			else{
				callback(true);
			}
	});
}
exports.ispay = function(user_id){
	sql.select('users','id',user_id,function(data){
		var today = new Date();
		var users = [];
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		var day = yyyy+"-"+mm+"-"+dd;
		return moment(data[0].pay).isAfter(day);
	});
}