const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    role: {type: String, default: "user"},
    password: {type: String, required: true},
    addresses: {type: [{
        name: String,
        email: String,
        number: Number,
        streetAddress: String,
        city: String,
        state: String,
        pincode: Number
    }]}
})

const virtual = userSchema.virtual('id')
virtual.get(function(){ 
    return this._id 
})

userSchema.set('toJSON', { 
    virtuals: true, 
    versionKey: false, 
    transform: function (doc, ret) {delete ret._id}
})

module.exports = mongoose.model('user', userSchema)