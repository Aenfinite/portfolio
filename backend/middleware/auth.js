const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ error: "No authentication token provided" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key-change-in-production")
    req.adminId = decoded.adminId
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" })
  }
}

module.exports = authMiddleware
