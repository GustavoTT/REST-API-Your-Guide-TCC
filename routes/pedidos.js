const express = require('express');
const router  = express.Router();


// EXEMPLO GET, retorna todos os pedidos
router.get('/', (req, res, next) => { // Lista com todos os produtos
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de pedidos'
    });
});


// EXEMPLO POST, insere um pedido
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'Usando POST dentro da rota de pedidos',
        pedidoCriado: pedido
    });
});


// EXEMPLO POST, retorna os dados de um pedido
router.get('/:id_pedido', (req, res, next) => { // Lista de um pedido em específico
    const id = req.params.id_pedido // Pega do id passado na URL e atribui a variável id
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id_pedido: id
        });
});


// EXEMPLO DELETE, exclui um pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota de pedidos'
    });
});
module.exports = router;