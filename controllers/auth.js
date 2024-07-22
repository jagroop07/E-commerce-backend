const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userSignUp = async(req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        return res.status(200).send("user registered successfully")
        
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const userLogin = async(req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        if(user.password === password){
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY)
            res.cookie('token',token, {httpOnly: true})
            return res.status(200).json({id: user.id, role: user.role})
        }

        return res.status(401).json({message: "wrong credentials"})
    } catch (error) {
        console.log(error.message)
        return res.status(400).send(error.message)
    }
}

module.exports = {
    userSignUp,
    userLogin
}