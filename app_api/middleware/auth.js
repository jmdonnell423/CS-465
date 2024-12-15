const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        console.error("Authorization header missing");
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        console.log("Decoded Token:", decoded); // Debug log
        req.payload = decoded; // Attach decoded payload to req.payload
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error("Token validation error:", err.message); // Debug log
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;



