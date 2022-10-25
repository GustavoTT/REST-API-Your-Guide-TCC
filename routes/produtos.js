const express = require('express');
const router  = express.Router();


// EXEMPLO GET, retorna todos os produtos
router.get('/', (req, res, next) => { // Lista com todos os produtos
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos'
    });
});


// EXEMPLO POST, insere um produto
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };
    res.status(201).send({
        mensagem: 'Usando POST dentro da rota de produtos',
        produtoCriado: produto
    });
});


// EXEMPLO POST, retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => { // Lista de um produto em específico
    const id = req.params.id_produto // Pega do id passado na URL e atribui a variável id

    if (id === 'especial') { // Seleção de um id específico
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id_produto: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }
});


// EXEMPLO PATCH, altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de produtos'
    });
});


// EXEMPLO DELETE, exclui um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota de produtos'
    });
});
module.exports = router;