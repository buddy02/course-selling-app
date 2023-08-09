import jwt from "jsonwebtoken";

export const secretKey = "S3cr3t7";

export const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.headers["userId"] = payload.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
