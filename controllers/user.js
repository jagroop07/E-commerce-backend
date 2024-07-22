const User = require('../models/user')

const fetchLoggedInUser = async(req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateUser = async(req,res) => {
    try {
        const id = req.user.id
        const user = await User.findByIdAndUpdate(id, req.body, {new: true})
        console.log(user)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const isAuthUser = async(req, res) => {
    try {
        if(req.user){
            const user = await User.findById(req.user.id)
            return res.status(200).send({id: user.id, role: user.role})
        }
        else{
            return res.sendStatus(401)
        }
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {
    updateUser,
    fetchLoggedInUser,
    isAuthUser
}