const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    value: {type: String, required: true},
    label: {type: String, required: true}
})

const virtual = categorySchema.virtual('id')
virtual.get(function(){ 
    return this._id 
})

categorySchema.set('toJSON', { 
    virtuals: true, 
    versionKey: false, 
    transform: function (doc, ret) {delete ret._id}
})

module.exports = mongoose.model('category', categorySchema)