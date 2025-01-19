import jwt from 'jsonwebtoken';

export const authenticateToken = async (request, response, next) => {
    const authHeader = request.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return response.send("Access denied | No token provided" );
    }
    try{
        const secretKey =  "gdbjsbhgdyebfh";
      const decode = jwt.verify(token, secretKey);
      request.user = decode;
      next();
    }catch(err){
        console.log(err);
    }
}