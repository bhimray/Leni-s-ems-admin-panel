module.exports = (req, res, next)=>{
    const authHeader = req.get("authorization");
    console.log(req.header, "is the header")
    console.log(authHeader, "is the authHeader in check authorrized")
    if (authHeader){
        req.checkAuthorized= true;
        console.log(`user is authorized`)
    }
    next()
}