var mongoose    =   require("mongoose");
//var connect= require('../config/config');
// mongoose.connect('mongodb://localhost:27017/chatApp',{ useNewUrlParser: true });
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
            'firstName'  : {
                        type : String, 
                        required: true
                    },
            // 'mname':  {
            //             type:String, 
            //             required: true
            //         },
            'lastName':  {
                        type: String, 
                        required: true
                    },
            'userName':    {
                        type: String, 
                        required: true
                    },
            'phoneNumber': {
                        type: Number, 
                        required: true
                    },
            'email':  {
                        type: String, 
                        required: true
                    },
            'password':   {
                            type: String, 
                            required: true
                        },
            // 'gender':   {
            //                 type: String, 
            //                 required: false
            //             }
});
// create model if not exists.
module.exports = mongoose.model('users',userSchema);
