const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    paymentMethod : {type: String, required: true},
    paymentStatus: {type: String, default: 'pending'},
    status: {type: String, required: true},
    totalAmount: {type: Number, required: true},
    totalItems: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    selectedAddress: {type: Object, required: true},
    products: {type: mongoose.Schema.Types.Mixed, required: true}
})

const virtual = orderSchema.virtual('id')
virtual.get(function(){
    return this._id
})

orderSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {delete ret._id}
})

module.exports = mongoose.model('order', orderSchema)