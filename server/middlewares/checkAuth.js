function checkAuth(req,res,next){
    if(req.session.islogged_in){
        next();
        return;
    }else{
        res.redirect('/signin');
    }
}
module.exports = checkAuth;