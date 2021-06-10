const jwt = require('jsonwebtoken');

// A Middleware function to authenticate user through JWT.
//This function can be added to any routes which need to check if the user logged in.
function auth (request, response, next) {
    // Check if the current user has auth-token with him in the header.
    const token = request.header('auth-token');
    if (!token){
        return response.status(400).send('Access Denied');
    }

    // While the auth-token exists, verify to see if the token is valid or not.
    try{
        // After verification, we will get back the id of the user.
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        request.user = verified;
        next();
    }catch(error){
        response.status(400).send('Invalid Token');
    }
}

module.exports.auth = auth;