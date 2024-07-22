const Product = require('../models/products')

const createProduct = async(req,res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const fetchFilterProducts = async(req, res) => {
    try {
        let query  = Product.find({})
        let totalCountquery  = Product.find({})

        if(req.query.category){
            query = query.find({category: req.query.category})
            totalCountquery = totalCountquery.find({category: req.query.category})
        }

        if(req.query.brand){
            query = query.find({brand: req.query.brand})
            totalCountquery = totalCountquery.find({brand: req.query.brand})
        }

        if(req.query._sort && req.query._order){
            query = query.sort({[req.query._sort]: +req.query._order})
        }

        if(req.query._page && req.query._per_page){
            query = query.skip(req.query._per_page*(req.query._page-1)).limit(req.query._per_page)  //skip skips the amount of product 
        }

        const docs = await query.exec()
        const total = await totalCountquery.countDocuments().exec()
        return res.status(200).send({data: docs, items: total})

    } catch (error) {
       return res.status(400).send(error.message)  
    }
}

// const fetchFilterProducts = async(req, res) => {
//     try {
//         const match = {}
//         const sort = {}
//         let skip = {}
//         let limit = {}

//         if(req.query.category){
//             match.category = req.query.category
//         }

//         if(req.query.brand){
//             match.brand = req.query.brand
//         }

//         if(req.query._sort && req.query._order){
//             sort[req.query._sort] = +req.query._order
//         }

//         if(req.query._page && req.query._per_page){
//             skip.skip = req.query._per_page*(req.query._page-1)
//             limit.limit = parseInt(req.query._per_page)
//         }

//         let pipeline = []

//         if(Object.keys(match).length>0){
//             pipeline.push({$match: match})
//         }

//         const facet = {
//             totalCount : [{$count: 'total'}],
//             docs: [
//                 ...(Object.keys(sort).length>0 ? [{$sort: sort}]: []),
//                 {$skip: skip.skip},
//                 {$limit: limit.limit}
//             ]
//         }
        
//         pipeline.push({$facet: facet})

//         const result = await Product.aggregate(pipeline).exec()

//         const total = result[0].totalCount.length>0? result[0].totalCount[0].total : 0
//         const docs = result[0].docs

//         return res.status(200).send({data: docs, items: total})

//     } catch (error) {
//         return res.send(error.message)
//     }
// }

const fetchProductbyId = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        return res.status(200).send(product)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message)
    }
}

const updateProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).send(product)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message)
    }
}

const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id, {new: true})
        return res.status(200).send(product)
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message)
    }
} 

module.exports = {
    createProduct,
    fetchFilterProducts,
    fetchProductbyId,
    updateProduct,
    deleteProduct
}