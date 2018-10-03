 var mongoose = require('mongoose');
//  mongoose.connect('mongodb://localhost:27017/chatApp',{ useNewUrlParser: true });
// create instance of Schema
var mongoSchema =   mongoose.Schema;
 // create schema
  var ChatSchema = new mongoSchema({
    message:{type:String,required:true},
    userid:{type:String,required:true},
    date:{type:Date,default:Date.now},
    userName:{type:String,required:true}
  });

// create model if not exists.
module.exports = mongoose.model('message',ChatSchema);
