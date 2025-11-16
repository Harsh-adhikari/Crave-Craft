// const jwt = require('jsonwebtoken')

// const verifyToken = (req, res, next)=>{
//     let token = req.headers["authorization"]

//     if(token){
//         token = token.split(" ")[1]
//         jwt.verify(token, process.env.SECRET_KEY,(err,decoded)=>{
//             if(err){
//                 return res.status(400).json({message:"Invalid token"})
//             }
//             else{
//                 console.log(decoded)
//                 req.user=decoded
//             }
//         })
//         next()
//     }
//     else{
//         return res.status(400).json({message:"Invalid token"})
//     }
// }
// module.exports = verifyToken
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    let token = req.header('Authorization');
    
    if (!token) {
      return res.status(401).json({
        message: 'No authentication token, access denied'
      });
    }

    // Remove 'Bearer ' prefix if it exists
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    // Verify token using the same SECRET_KEY used in user controller
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    console.log('Token decoded successfully:', decoded);
    
    // Attach decoded user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({
      message: 'Token is not valid'
    });
  }
};

module.exports = verifyToken;