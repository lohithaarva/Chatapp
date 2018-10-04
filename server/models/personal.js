 var mongoose = require('mongoose');
//  mongoose.connect('mongodb://localhost:27017/chatApp',{ useNewUrlParser: true });
//  create instance of Schema
 var mongoSchema =   mongoose.Schema;
//   create schema
 var personalchatSchema = new mongoSchema({
    message:{type:String,required:true},
    senderid:{type:String,required:true},
    receiverid:{type:String,required:true},
    date:{type:Date,default:Date.now},
    sendername:{type:String,required:true},
    receivername:{type:String,required:true}

   });

// // create model if not exists.
 module.exports = mongoose.model('personalmsg',personalchatSchema);

