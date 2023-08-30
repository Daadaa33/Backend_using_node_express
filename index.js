require('dotenv').config()
// require your server and launch it
const server = require('./api/server');

const PORT = process.env.PORT || 4000;

console.log("env from render is ",process.env.PORT)

server.listen(PORT, () => {
    console.log(`\n***** your server Running on http://localhost:${PORT} ****\n`)
})