const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);


mongoose.connect('mongodb+srv://fbalbino:fbalbino@cluster0-2kr4g.mongodb.net/week10?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors());
app.use(express.json());
app.use(routes);

// Metodos HTTP: GET, POST, PUT, DELETE

// Tupos de parametros:
// QUERY PARAMS: request.query (Filtros, ordenacao, paginacao)
// ROUTE PARAMS: request.params (identificar um recurso na requisicao ou remocao) Quando falamos de um unico identificador (delete user/4)
// BODY: Request.body (dados para criacao ou alteracao) Usado principalmente por meio do POST E PUT. Usamos para editar ou criar/store alguma coisa. 

// Mongo DB (Nao relacional)

server.listen(3333);