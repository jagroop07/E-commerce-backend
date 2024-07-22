const Category = require('../models/categories')

const fetchCategory = async(req, res) => {
    try {
        const category = await Category.find({})
        return res.status(200).send(category)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const createCategory = async(req, res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        return res.status(200).send(category)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    fetchCategory,
    createCategory
}