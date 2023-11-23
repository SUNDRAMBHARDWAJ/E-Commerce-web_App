function SellerAuth(req,res,next){
    if(req.session.isSeller){
        next();
        return;
    }else{
        res.redirect('/')
    }
}
module.exports =  SellerAuth;