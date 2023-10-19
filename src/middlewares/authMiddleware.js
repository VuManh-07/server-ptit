const jwt = require('jsonwebtoken');

async function isAuth (req,res, next) {
    const token = req.body.token || req.query.token || req.headers[ "x-access-token" ]; 
    if (!token) {
		return res.status(401).send('Không tìm thấy access token!');
	}

    const secret = process.env.SECRET_KEY | '112233445566';
    const verified = jwt.verify(
		token,
		'112233445566',
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}
   
	req.code = verified.code;
	return next();
}

module.exports = isAuth