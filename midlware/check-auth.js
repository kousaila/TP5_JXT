const jwt=require('jsonwebtoken')
fs = require("fs")
const secret = fs.readFileSync("jwtRS256.key")



module.exports=(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        console.log(token)
        const decoded=jwt.verify(token,secret);
        req.userData=decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'authentification faild'
        })
    }
    
   
};