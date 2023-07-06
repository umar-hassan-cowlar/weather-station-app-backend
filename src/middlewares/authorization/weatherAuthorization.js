const JWT = require("jsonwebtoken");

const weatherAuthorization = async (req, res, next) => {
  // token extraction
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ error: "Unauthorized User, No Authorization Key Found" });
  }

  try {
    let user = await JWT.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (e) {
    res
      .status(400)
      .json({ error: "Unauthorized User, Invalid Token or Token Expired" });
  }
};

module.exports = weatherAuthorization;
