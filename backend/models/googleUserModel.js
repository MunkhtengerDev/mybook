const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");



const googleUserSchema = new mongoose.Schema({
    username:String,
    name: String,
    googleId: String,
    secret: String
},

{ timestamps: true }
)





googleUserSchema.plugin(passportLocalMongoose);
googleUserSchema.plugin(findOrCreate);


module.exports = mongoose.model('googleUser',googleUserSchema)

