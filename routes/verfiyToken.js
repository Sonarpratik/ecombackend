const jwt = require("jsonwebtoken");




const verifyToken=(req,res,next)=>{
    const authHeader= req.headers.token;

    if(authHeader){
const token =authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err){
        res.status(403).json("Token is not valid");
         }
        
            req.user =user;
            next();
        
        })
    }else{
        return res.status(401).json("Your are not autheicated")
    }
};

// only to user personal data amd admin
const verifyTokenAuthorization =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id|| req.user.isAdmin){
        next();
        }else{
       res.status(403).json("No Bro Your Cant");

        }
    });
};
//only admin
const verifyTokenAuthorizationAndAdmin =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
        next();
        }else{
       res.status(403).json("No Bro Your Cant");

        }
    });
};

module.exports = {verifyToken,verifyTokenAuthorization,verifyTokenAuthorizationAndAdmin};