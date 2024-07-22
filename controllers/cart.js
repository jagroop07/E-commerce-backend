const Cart = require('../models/cart')

const addToCart = async(req, res) => {
    try {   
        const id = req.user.id
        const cart = await Cart({...req.body, user: id}).populate('product')
        await cart.save()
        return res.status(200).send(cart)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const deleteCart = async(req, res) => {
    try {
        const {id} = req.params
        const deletedCart = await Cart.findByIdAndDelete(id)
        return res.status(200).send(deletedCart)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateCart = async(req, res) => {
    try {
        const {id} = req.params
        const updateCart = await Cart.findByIdAndUpdate(id, req.body, {new: true}).populate('product')
        return res.status(200).send(updateCart)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const findCartById = async(req, res) => {
    try {
        const userId = req.user.id
        // const id = new ObjectId(userId)
        // console.log(req.query)
        const cart = await Cart.find({user: userId}).populate('product')
        return res.status(200).send(cart)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    addToCart,
    deleteCart,
    updateCart,
    findCartById
}