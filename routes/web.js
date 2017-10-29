app.get('/',function(req,res){
  res.render('login');
});
app.get('/login',function(req,response){
  var email = req.param('email');
  var password = req.param('password');
  var sql = "select * from users where email = ? and password = ? and rule = ?";
  con.query(sql,[email,password,1],function(err, res){
    if(res.length == 0){
      response.redirect('/');
    }
    else{
      session.startSession(req, response,function(){
    //fake session ------->
    req.session.put('hospital_id',res[0].hospital_id);
        req.session.put('rule', res[0].rule);
          response.redirect('/users');
      });
    }
  });
});



//full admin control -------------->
app.get('/users',function(req,res){
  session.startSession(req, res,function(){
    sql.select('users','1','1',function(data){
    	var today = new Date();
    	var users = [];
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	var day = yyyy+"-"+mm+"-"+dd;
	sql.select('users','1','1',function(data1){
	for(let i in data1){
		//if the user still has paid time ----->
		if(moment(data1[i].pay).isAfter(day)){
		 users.push(data1[i]);
		}
		else{
			
		}
	}
	
        	res.render('users',{data:data,users});
    	});
    });
  });
});

app.get('/make-admin',function(req,res){
	var user_id = req.param('user_id');
	full_admin.makeAdmin(user_id,function(data){
		if(data){
			res.redirect('/users');
		}
		else{
			res.send('please contact the programmer there is error in database')
		}
	});
});

app.get('/add_user',function(req,res){
	var name = req.param('name');
	var email = req.param('email');
	var password = req.param('password');
	full_admin.addUser(name,email,password,function(data){
		if(data){
			res.redirect('/users');
		}
		else{
			res.send('please contact the programmer there is error in database')
		}
	});
});

app.get('/block',function(req,res){
	var user_id = req.param('user_id');
	full_admin.block(user_id,function(data){
		if(data){
			res.redirect('/users');
		}
		else{
			res.send('please contact the programmer there is error in database')
		}
	});
});

app.get('/unblock',function(req,res){
	var user_id = req.param('user_id');
	full_admin.unblock(user_id,function(data){
		if(data){
			res.redirect('/users');
		}
		else{
			res.send('please contact the programmer there is error in database')
		}
	});
});

app.get('/delete-user',function(req,res){
	var user_id = req.param('id');
	sql.delete('users','id',user_id,function(data){
		if(data){
			res.redirect('/users');
		}
		else{
			res.send('please contact programmer if you got that error again');
		}
	})
});


app.get('/pay-per-month',function(req,res){
	var user_id = req.param('user_id');
	var months = req.param('months');
	full_admin.pay_per_month(user_id,months,function(data){
		if(data){
			res.redirect('/users');
		}
		else{
			res.send('please contact programmer the error may be in database or package called moment.js or add-substract-date')
		}
	})
});

app.get('/change',function(req,res){
	var id = req.param('id');
	var what = req.param('what');
	var new_name = req.param('new_name');
	sql.update('users',what,new_name,'id',id,function(data){
		res.send(data);
	});
});

//full admin control -------------->
app.get('/groups',function(req,res){
  session.startSession(req, res,function(){
    sql.select('groups','1','1',function(data){
        res.render('groups',{data:data});
    });
  });
});
app.get('/edit-group-name',function(req,res){
	var group_id = req.param('group_id');
	var name = req.param('name');
	full_admin.edit_group_name(group_id,name,function(data){
		if(data){
			res.send(true);
		}
		else{
			res.send('please contact programmer the error may be in database or package called moment.js or add-substract-date')
		}
	})
});

app.get('/delete-group',function(req,res){
	var group_id = req.param('id');
	sql.delete('groups','id',group_id,function(data){
		if(data){
			res.redirect('/groups');
		}
		else{
			res.send('please contact programmer if you got that error again');
		}
	})
});

app.get('/add_group',function(req,res){
	var name = req.param('name');
	full_admin.add_group(name,function(data){
		if(data){
			res.redirect('/groups');
		}
		else{
			res.send('contact programmer');
		}
	})
});


/* -------------------------------------- API ----------------------------------------- */
app.get('/api/users',function(req,res){
	sql.select('users','work','1',function(data){
		 
		if(data.length != 0){
			var single = [];
			var result = [];
			for(let i in data){
				var today = new Date();
				var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		var day = yyyy+"-"+mm+"-"+dd;
		if(moment(data[i].pay).isAfter(day)){
			if(single.length == 1){
					if(single.push({name: data[i].name,avatar_url: data[i].image,id: data[i].id,special:true})){
						if(result.push(single)){
							single = [];			
						}
					}
				}
				else{
						single.push({
							name: data[i].name,
							avatar_url: data[i].image,
							id: data[i].id,
							special: true
						});
							if(i == data.length-1){
								result.push(single)
							}
						}
					if(i == data.length-1){
		
//second loop 
								
									var single1 = [];
									
									for(let m in data){

										var today = new Date();
										var dd = today.getDate();
								var mm = today.getMonth(); //January is 0!
								var yyyy = today.getFullYear();
								var day = yyyy+"-"+mm+"-"+dd;
								if(moment(data[m].pay).isAfter(day) == false){
									
									if(single1.length == 1){
											if(single1.push({name: data[i].name,avatar_url: data[m].image,id: data[m].id,special:false})){
												if(result.push(single1)){
													single1 = [];			
												}
											}
										}
										else{
												single1.push({
													name: data[m].name,
													avatar_url: data[m].image,
													id: data[m].id,
													special: false
												});

													if(m == data.length-1){
														result.push(single1)
													}
												}

												
									} // end if special
									if(m == data.length-1){
										res.send(result);
										console.log(result.length);
									}
								} // end for looop 
								
							
							
							
		        }
						
			} // end if special
			
		} // end for looop 
		
	} //there is  data
	else{ //there is no data
			res.send([[{name:false}]]);
		}
	});
});




app.get('/api/fav',function(req,res){
	var user_id = req.param('user_id');
	sql.select('likes','someone_id',user_id,function(data1){
		 
		if(data1.length != 0){
			
			var single = [];
			var result = [];
			
			for(let i in data1){
				console.log(i)
				sql.select('users','id',data1[i].liked_id,function(data){
					if(single.length == 1){

						if(single.push({
									name: data[0].name,
									avatar_url: data[0].image,
									id: data[0].id
									})){
							if(result.push(single)){
									single = [];
									
										
							}
						}
					}
					else{
						single.push({
							name: data[0].name,
							avatar_url: data[0].image,
							id: data[0].id
						});
							if(i == data1.length-1){
								result.push(single)
							}
						}
					if(i == data1.length-1){
						res.send(result)
					}
				})
				
				
				
				
			}
			
		}
		else{
			res.send([[{name:false}]]);
		}
	});
	});



//all people  have the same interest -------------->
app.get('/api/interest',function(req,res){
	var group_id = req.param('group_id');
	sql.select('related_groups','group_id',group_id,function(data1){
		 
		if(data1.length != 0){
			
			var single = [];
			var result = [];
			
			for(let i in data1){
				console.log(i)
				sql.select('users','id',data1[i].user_id,function(data){
					if(single.length == 1){

						if(single.push({
									name: data[0].name,
									avatar_url: data[0].image,
									id: data[0].id
									})){
							if(result.push(single)){
									single = [];
									
										
							}
						}
					}
					else{
						single.push({
							name: data[0].name,
							avatar_url: data[0].image,
							id: data[0].id
						});
							if(i == data1.length-1){
								result.push(single)
							}
						}
					if(i == data1.length-1){
						res.send(result)
					}
				})
				
				
				
				
			}
			
		}
		else{
			res.send([[{name:false}]]);
		}
	});
	});


//all groups -------------->
app.get('/api/interestsscreen',function(req,res){
	
	sql.select('groups','1','1',function(data1){
		 
		if(data1.length != 0){
			
			var single = [];
			var result = [];
			
			for(let i in data1){
				
				
					if(single.length == 1){

						if(single.push({
									name: data1[i].name,
									avatar_url: data1[i].image,
									id: data1[i].id
									})){
							if(result.push(single)){
									single = [];
									
										
							}
						}
					}
					else{
						single.push({
							name: data1[i].name,
							avatar_url: data1[i].image,
							id: data1[i].id
						});
							if(i == data1.length-1){
								result.push(single)
							}
						}
					if(i == data1.length-1){
						res.send(result)
					}
				
				
				
				
				
			}
			
		}
		else{
			res.send([[{name:false}]]);
		}
	});
	});

//search screen -------------->
app.get('/api/search',function(req,res){
	var name = req.param('name');
	sql.lselect('users','name',name,function(data1){
		 console.log(data1);
		if(data1.length != 0){
			
			var single = [];
			var result = [];
			
			for(let i in data1){
				
							var today = new Date();
		
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		var day = yyyy+"-"+mm+"-"+dd;
		if(moment(data1[i].pay).isAfter(day)){
			var special = true;
		}
		else{
			var special = false;
		}
					if(single.length == 1){

						if(single.push({
									name: data1[i].name,
									avatar_url: data1[i].image,
									id: data1[i].id,
									special: special
									})){
							if(result.push(single)){
									single = [];
									
										
							}
						}
					}
					else{
						single.push({
							name: data1[i].name,
							avatar_url: data1[i].image,
							id: data1[i].id,
							special: special
						});
							if(i == data1.length-1){
								result.push(single)
							}
						}
					if(i == data1.length-1){
						res.send(result)
					}
				
				
				
				
				
			}
			
		}
		else{
			res.send([[{name:false}]]);
		}
	});
	});

app.get('/api/unlike',function(req,res){
	var someone_id = req.param('someone_id');
	var liked_id = req.param('liked_id');
	sql.ddelete('likes','someone_id',someone_id,'liked_id',liked_id,function(data){
			res.send({status:data});
	})
});

app.get('/api/like',function(req,res){
	var someone_id = req.param('someone_id');
	var liked_id = req.param('liked_id');
	con.query('insert into likes(someone_id,liked_id) values(?,?)',[someone_id,liked_id],function(err,ress){
		if(err){
				res.send({status:false});
		}
		else{
			res.send({status:true});
		}
	})
})

app.get('/api/user',function(req,res){
	var user_id = req.param('user_id');
	sql.select('users','id',user_id,function(user){
		sql.select('related_groups','user_id',user_id,function(groups){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		var day = yyyy+"-"+mm+"-"+dd;
		if(moment(user[0].pay).isAfter(day)){
			var special = true;
		}
		else{
			var special = false;
		}
		 group = [];
		for(let g in groups){
			sql.select('groups','id',groups[g].group_id,function(group_data){
					group.push(group_data[0]);
					if(g == groups.length-1){
						
						let data = {
						id: user[0].id,
						name: user[0].name,
						
						groups: group,
						special: special,
						avatar_url: user[0].image,
						age: user[0].age,
						country: user[0].country,
						bio: user[0].bio
						}
						res.send(data);
					}
			});
			
			
		}
			
		})
	})
})

app.get('/api/trend',function(req,res){
	var user_id = req.param('someone_id');
	sql.select('users','1','1',function(user){
			var data = [];
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		var day = yyyy+"-"+mm+"-"+dd;
			for(let c in user){
				if(moment(user[c].pay).isAfter(day)){
					var special = true;
					data.push({
				id: user[c].id,
				name: user[c].name,
				avatar_url: user[c].image, 
				special: special,
					})
				}
				else{
					var special = false;
				}
					if(c == user.length-1){
						res.send(data);
					}
			}
		})
			
		
	
})