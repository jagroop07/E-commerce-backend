const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    discountPercentage: {type: Number , required: true},
    stock: {type: Number, min: [0, 'wrong minimum stock'], required: true, default: 0},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    rating: {type: Number, min: [0, 'wrong minimum rating'], max: [5, 'wrong maximum rating'], required:true, default: 0},
    thumbnail: {type: String, required: true},
    images: {type: [String], required: true}
})

const virtual = productSchema.virtual('id')
virtual.get(function(){ 
    return this._id
})

productSchema.set('toJSON', { 
    virtuals: true, 
    versionKey: false, 
    transform: function (doc, ret) {delete ret._id}
})

module.exports = mongoose.model('product', productSchema)