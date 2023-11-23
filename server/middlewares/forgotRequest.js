function checkRequest(req,res,next){
    if(req.session.feRequest){
        next();
        return;
    }else{
        res.redirect('/signin');
    }
}
module.exports = checkRequest;