const express    = require('express');
const app        = express();
const morgan     = require('morgan');
const bodyParser = require ('body-parser');

const rProdutos = require('./routes/produtos');

app.use(morgan('dev')); // Retorna no console a atividade realizada
app.use(bodyParser.urlencoded({ extended: false })); // Aceita apenas dados simples
app.use(bodyParser.json()); // Aceita Json de entrada

app.use((req, res, next) => { // Determina as informações de cabeçalho que serão aceitas
    res.header('Access-Control-Allow-Origin', '*'); // '*' aceita todos ; 'https://servidorespecifico' aceita somente este servidor
    res.header('Access-Control-Allow-Header', 
               'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    ); // infrmações do cabeçalho

    if (req.method === 'OPTIONS') { // Métodos que a API aceita
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/produtos', rProdutos);

app.use((req, res, next) => { // Não encontra a rota
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
});

module.exports = app;