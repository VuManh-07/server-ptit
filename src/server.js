const express = require('express');
const cors = require('cors');  
const logger = require('morgan');
const http = require('http');  
const route = require('./routes')
const io = require('./utils/io');
require('dotenv').config();


const app = express(); 
const server = http.createServer(app);  

io.attach(server, {
  cors: {
    origin: '*',
  }
});

const PORT = process.env.PORT || 3040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('dev'));

route(app);

app.get('/', (req, res) => {
	res.send('APP IS RUNNING');
}); 
 
 
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
