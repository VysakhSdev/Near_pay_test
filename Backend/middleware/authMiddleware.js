
import jwt from "jsonwebtoken";
export const verifyUserToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ error: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];


    
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }
  
    jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      req.userName = decoded.name;
      req.userId = decoded.id;
      next();
    });
  };