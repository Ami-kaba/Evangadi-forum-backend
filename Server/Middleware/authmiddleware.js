const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")

async function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization
    // console.log(authHeader);
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication invalid"})
    }
    const token = authHeader.split(' ')[1]
    // console.log(authHeader);
    // console.log(token);
    try{
        const {username, userid} = jwt.verify(token,process.env.JWT_SECURT)
        req.user = {username, userid}
        next()
    }catch(e){
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication invalid"})
    }
}
module.exports = authMiddleware;