const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    value: {type: String , required: true},
    label: {type: String, required: true}
})

const virtual = brandSchema.virtual('id')
virtual.get(function(){ 
    return this._id 
})

brandSchema.set('toJSON', { 
    virtuals: true, 
    versionKey: false, 
    transform: function (doc, ret) {delete ret._id}
})

module.exports = mongoose.model('brand', brandSchema)