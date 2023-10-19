const jwt = require('jsonwebtoken');
const io = require('../utils/io')

const SECRET_KEY = process.env.SECRET_KEY || "112233445566";

const login = (req, res) => {
    const {code, clientID} = req.body;
    const payload = { code: code };
    console.log({code, SECRET_KEY, clientID})
    jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
        return res.status(500).json({ message: 'Failed to generate token' });
        }

        // Trả về JWT cho client
        io.to(clientID).emit("res-token", {accessToken: token})
        res.json({ result: true}); 
    });
}

module.exports = {
    login
}