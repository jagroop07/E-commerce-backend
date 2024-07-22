const Order = require('../models/orders')

const createOrder = async(req, res) => {
    try {
        const id = req.user.id
        const order = await Order({...req.body, user: id})
        await order.save()
        return res.status(200).send(order)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message)
    }
}

const fetchOrderById = async(req, res) => {
    try {
        const id = req.user.id
        const orders = await Order.find({user: id})

        return res.status(200).send(orders)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message)
    }
}

const fetchAllOrders = async(req, res) => {
    try {
        let query = Order.find({})
        let itemQuery = Order.find({})

        if(req.query._sort && req.query._order){
            query = query.sort({[req.query._sort]: +req.query._order})
        }
        if(req.query._page && req.query._per_page){
            const page = req.query._page
            const limit = req.query._per_page
            query = query.skip(limit*(page-1)).limit(limit)
        }

        const doc = await query.exec()
        const total = await itemQuery.countDocuments().exec()
        return res.status(200).send({data: doc, items: total})
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateOrder = async(req, res) => {
    try {
        const {id} = req.params
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).send(order)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    createOrder,
    fetchAllOrders,
    updateOrder,
    fetchOrderById
}