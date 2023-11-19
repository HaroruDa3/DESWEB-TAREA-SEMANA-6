const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretConfig = process.env.SECRET_CONFIG
const validarCookie = async ( req, res, next )=>{
    let info = {
        operacion : false,
        payload : "Token no valido"
    }
    try {
        const payload = await jwt.verify(req.body.cookie, secretConfig);
        info.operacion = true;
        info.payload = payload;
        req.user = payload;
        next();
    }catch(err){
        res.json(info) 
    }
} 

export{
    validarCookie
}