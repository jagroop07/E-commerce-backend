const {Strategy: JwtStrategy} = require('passport-jwt')
const User = require('../models/user')

const cookieExtracter = req => {
    let token = null

    if(req && req.cookies){
        token = req.cookies['token']
    }

    return token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTVlOGVhMzVkOWNjYzc4YmVhZDJkZCIsImlhdCI6MTcyMTM1NjAzN30.gB1rTZ8LXUUHS5-ZRDUw5QBgWbQ5ZvQTjWrujG702Yw"
}

const opts = {}
opts.jwtFromRequest = cookieExtracter
opts.secretOrKey = process.env.JWT_SECRET_KEY

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id)
            if(!user){
                done(null, false, {message: "user not authorized"})
            }
            else{
                done(null, user)
            }
        } catch (error) {
            done(error, false)
        }
    }))
}