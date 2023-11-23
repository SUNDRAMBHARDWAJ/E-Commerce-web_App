const MY_SECRET_KEY = "Thisis%6557766252552";
const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next)=>{
    try{
        const cookie = req.headers.cookie;
        console.log(req.headers)
        if(!cookie){
            res.status(400).json({verify:false})
            return
        }
        const token = cookie.split("=")[1];
        
        console.log()
        //const headers = req.headers['authorization']
        console.log(token)
        jwt.verify(String(token),MY_SECRET_KEY,(err,user)=>{
            if(err){
                res.status(400).json({verify:false})
            }
            console.log(user)
            res.id  = user.id;
            res.type = user.type
            next();
        })
    }catch{
        res.status(400).json({verify:false})
    }
    
}
module.exports = verifyToken;