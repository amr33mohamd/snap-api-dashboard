
   express = require('express');
   app = express();
  var mysql = require('mysql');
   port = process.env.PORT || 5000;
    
     addSubtractDate = require("add-subtract-date");
    moment = require('moment');
moment().format('L');  
  app.set('view engine', 'ejs');
  app.use(express.static('public'));
 
  con = mysql.createConnection({
  host: "xq7t6tasopo9xxbs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "ig0y42t0qon3wqzt",
  password: "hsaznraptzuuo2yy",
  database:"c7waly6mhus0n37w",
  charset: 'utf8'
  });
 
  /*
   con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"snap",
  charset: 'utf8'
  });
*/
//session ----->
var NodeSession = require('node-session');

// init
session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});

var sql1 = "SET CHARACTER SET utf8";
 con.query(sql1, function (err, result) {
 var sql = "SET SESSION collation_connection ='utf8_general_ci";
 con.query(sql,  function (err, result) {
  con.query('SET NAMES \'UTF8\'',function(err,res){

  })
 });
 });


  app.listen(port,function(){
    console.log('listenning on port '+port);

  });
