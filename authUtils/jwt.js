const JWT = require('jsonwebtoken')
const SECRECT = "secret" // update the secret 
const EXPIRESIN_MS = 600 * 1000

function tokenVerify(req, res, next){
    try{
        const authHeader = req.headers['authorization']
        if(!authHeader){
            return res.status(401).json({error: "missing auth key"})
        }
        const token = authHeader.split(' ')[1];
        const decode = JWT.verify(token, SECRECT)
        req.user = decode
        next();
    }catch(error){
        return res.status(429).json("fail to verify the token" )
    }
}

function tokenGenerate(payload = {user: linx}){
    try{
        const token = JWT.sign(payload, SECRECT, {expiresIn: EXPIRESIN_MS })
        return token
    }catch(error){
        console.log("fail to sign the token, ", error)
    }
}

module.exports.sign = tokenGenerate 
module.exports.verify = tokenVerify 