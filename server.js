const http = require('http');
const app =  require('./app')
const port = process.env.PORT || 3000;
const server = http.createServer(app); // Cria um server e insere o app
server.listen(port); // Escuta na porta 'port'

