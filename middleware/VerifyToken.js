import jwt from "jsonwebtoken";

// veryify bearer token
export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "No token provided",
    });
  }
  
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: "error",
      message: "Auth token is not supplied",
    });
  }
};
