const jwt = require('jsonwebtoken');
const io = require('../utils/io')

const SECRET_KEY = process.env.SECRET_KEY || "112233445566";

const login = (req, res) => {
    const {code} = req.body;
    console.log('code', code);
    const payload = { code: code };
    jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
        return res.status(500).json({ message: 'Failed to generate token' });
        }

        // Trả về JWT cho client 
        res.json({ result: true, accessToken: token}); 
    });
}

module.exports = {
    login
}