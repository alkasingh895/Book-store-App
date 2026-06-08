import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
   console.log("AUTH HEADER =", req.headers.authorization);
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : null;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // decoded me expected: { id, isAdmin }
    req.user = decoded;

    // Only admin allowed
    if (!decoded?.isAdmin) {
      return res.status(403).json({ message: "Forbidden: admin access only" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};

