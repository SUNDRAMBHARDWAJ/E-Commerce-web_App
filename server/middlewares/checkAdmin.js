function checkAdmin(req,res,next){
    if(req.session.isAdmin){
        next();
        return;
    }else{
        res.render('notauth');
    }
}
module.exports = checkAdmin;