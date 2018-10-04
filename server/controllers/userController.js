function encryption(password) {
    var pass= require('crypto')
         .createHash('sha1')
         .update(password)
         .digest('base64');
         return pass;
 }
 var users = require('../controllers/userController');


 exports.registration = function (req, res) {

     var userModel = require('../models/users')
     var db = new userModel();
     var response = {};
    //  var db = new usermod();
    db.firstName = req.body.firstName;
    db.lastName = req.body.lastName;
    db.email = req.body.email;
    db.userName = req.body.userName;
    db.phoneNumber = req.body.phoneNumber;

    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');

    var email = req.body.email;
    userModel.find({
        "email": email
    }, function (err, data) {

        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(404).send(response);
        } else {
            if (data.length > 0) {

                var response = {
                    "Success": false,
                    "message": "Credentials already Exist!!",
                };
                return res.status(404).send(response);
            } else {
                

                db.save(function (err) {

                console.log(db.firstName);
                console.log(db.lastName);
                console.log(db.email);
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err) {
                        response = {
                            "Success": false,
                            "message": "Error adding data",
                            "err": err
                        };
                    } else {
                        response = {
                            "Success": true,
                            "message": "Successfully Registed"
                        };
                    }
                    return res.status(200).send(response);
                });
            }
        }
    })
 }
 exports.login=function(req,res){
    var jwt = require('jsonwebtoken');
    var config = require('../config/auth');
    var userModel = require('../models/users')
    var db = new userModel();
        var mail = req.body.email;
    var pass = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
        userModel.find({ 'email': mail, password: pass }, function (err, result) {


        if (err) {
            response = {
                "Success": false,
                "message": "Data not found in database"

            };

            return res.status(400).send(err);


        } else {
            if (result.length > 0) {

                var token = jwt.sign({ id: db._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  var userName = result[0].firstName+' '+result[0].lastName;
                response = {
                    "Success": true,
                    "message": "Login Sucessfully",
                    "token": token,
                    "userid": result[0]._id,
                    "userName":userName

                };
                return res.status(200).send(response);
            }
            else {
                response = {
                    "Success": false,
                    "message": "Invalid username/ password"
                };
                return res.status(400).send(response);
            }
        }
    })
 }


 
exports.listOfUsers=function (req,res) {
    // return res.status(200).send("all good");
    var userModel = require('../models/users');
    var response = {};
    var arrList=[];
    var userid=req.params.id;
    userModel.find({"_id":{$ne:userid }},function (err,data) {
        // console.log(data);
        for(key in data){
                arrList.push({userName:data[key].userName,
                              userid:data[key]._id});
                    
                }
        
        if(err)
            {
                response={ "error":true,
                            "message":"error retrieving data"
                }
                return res.status(401).send(response);
            }
            else{
                response={
                    "error":false,
                    "message":arrList
                }
            
        return res.status(200).send(response);
            }
    })

}
//  exports.homePage= function(req,res){
//  }

 exports.addtodb=function (userid,userName,message,date) {
    var userModel = require('../models/message');
    var db = new userModel();
    var response={};
    db.message=message;
    db.date=date;
    db.userid=userid;
    db.userName=userName;
    db.save(function (err) {
        if (err) {
            response = {
                "error": true,
                "message": "error storing data"
            }
        }
        else {
            response = { "error": false, "message": "succesfully added to database" }
        }
    });
    console.log(response)

}
exports.getmsgs=function(req,res){
    var userModel = require('../models/message');
    var response = {};
    userModel.find({},function(err,data){
        if(data){
            response={
                "error":false,
                "message":data
                
            }
            res.status(200).send(response);
        }
        else{
            response={
                "error":true,
                "message":"something went wrong",
                
            }
            console.log(err);
            res.status(401).send(response);
        }
       
    })
}

exports.addtopersonaldb = function (userid,  message, date,receiverid,sendername,receivername) {
    var userModel = require('../models/personal');
    var db = new userModel();
    var response = {};
    db.message = message;
    db.date = date;
    db.senderid = userid;
    db.sendername = sendername;
    db.receivername=receivername;
    db.receiverid = receiverid;
    db.save(function (err) {//save the data into the database
        if (err) {
            response = {
                "error": true,
                "message": "error storing data"
            }
        }
        else {
            response = { "error": false, "message": "succesfully added to database" }
        }
    });
    console.log(response)

}
exports.getPersonalmsgs = function (req, res) {
    console.log("backend api")
    var userModel = require('../models/personal');
    var response = {};
    console.log(req.params.peerId);
    console.log(req.params.id);

    userModel.find({$or:[{ senderid: req.params.peerId, receiverid: req.params.id }, { senderid: req.params.id, receiverid: req.params.peerId }]}, function (err, data) { //finds all the data in the database
        console.log(data)
        if (data) {
            response = {
                "error": false,
                "message": data

            }
            res.status(200).send(response);
        }
        else {
            response = {
                "error": true,
                "message": "something went wrong",

            }
            console.log(err);
            res.status(401).send(response);
        }

    })
}




 
 
 
 
 