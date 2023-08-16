const express = require('express');

const server = express();

const userRouter= require('./users/user-router')
const PostRouter = require('./posts/post-router')

server.use(express.json());

server.use('/api/users', userRouter)
server.use('/api/posts', PostRouter)



server.get('*',  (req, res) => {
    res.status(404).json({message : `${req.method} ${req.baseUrl} not found!`})
})
 

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

// Write all your routes here

module.exports = server;
