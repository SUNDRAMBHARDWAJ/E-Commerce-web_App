function Addauth(req,res,next){
    if(req.session.isSeller||req.session.isAdmin){
        next();
        return;
    }else{
        res.render('notauth');
    }
}
module.exports = Addauth;