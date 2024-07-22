const Brand = require("../models/brands")

const fetchBrands = async(req, res) => {
    try {
        const brands = await Brand.find({})
        return res.status(200).send(brands)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const createBrands = async(req, res) => {
    try {
        const brand = new Brand(req.body)
        await brand.save()
        return res.status(200).send(brand)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    fetchBrands,
    createBrands
}