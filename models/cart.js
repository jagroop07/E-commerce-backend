const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    totalAmount: {type: Number, required: true},
    quantity: {type: Number, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}
}) 

const virtual = cartSchema.virtual('id')
virtual.get(function(){
    return this._id
})

cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {delete ret._id}
})

module.exports = mongoose.model('cart', cartSchema)