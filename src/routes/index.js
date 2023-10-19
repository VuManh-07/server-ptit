const auth = require('./auth');
const user = require('./user');
const bangdiem = require('./bangdiem');

function route(app){
    app.use("/api/auth", auth);
    app.use("/api/user", user);
    app.use("/api/bangdiem", bangdiem);
}

module.exports = route;