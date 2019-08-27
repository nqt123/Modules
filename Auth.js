const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", '')
        const decode = jwt.verify(token, 'QuyThang')
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(404).send("Error: User not authorized")
    }
}

module.exports = auth
