const jwt = require('jsonwebtoken')

module.exports = async (req, res, next)=>{
    const authHeader = await req.get("authorization");
    console.log(req.header, "is the header")
    console.log(authHeader, "is the authHeader in check authorrized")
    //checking if there is auth headers
    if (!authHeader){
        req.checkAuthorized= false;
        console.log(`user is not authorized to acess this. Please register`)
        return next()
    }

    //checking if there is token or it is null
    const token= authHeader.split(' ')[1];
    if (!token || token === ''){
        req.checkAuthorized=false;
        return next()
    }
    //decoding the token
    let decodedToken;
    console.log(decodedToken, "decoded token")
    try{
        decodedToken = jwt.verify(token, 'r38ridnfksdlfei48t94r9rf4r92m')
    }catch(err){
        req.checkAuthorized = false
        return next()
    }
    // check if there is decoded token
    if (!decodedToken){
        req.checkAuthorized= false;
        return next()
    }
    req.checkAuthorized=true;
    req.userId = decodedToken.userId
    next()
}