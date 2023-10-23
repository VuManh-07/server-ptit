const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send("Không tìm thấy access token!");
  }
  console.log(token);
  const secret = process.env.SECRET_KEY | "112233445566";
  jwt.verify(token, "112233445566", (err, decoded) => {
    if (err) {
      res.status(401).send("Bạn không có quyền truy cập vào tính năng này!");
    }
	console.log(decoded);
	req.code = decoded.code;
	return next();
  });  
}

module.exports = isAuth;
