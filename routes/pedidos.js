const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').pool;


// EXEMPLO GET, retorna todos os pedidos
router.get('/', (req, res, next) => { // Lista com todos os produtos
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
        conn.query(` SELECT pedidos.id_pedido,
                            pedidos.quantidade,
                            produtos.id_produto,
                            produtos.nome,
                            produtos.preco
                       FROM pedidos INNER JOIN produtos 
                         ON produtos.id_produto = pedidos.id_produto;`,
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
            const response = {
                quantidadePedidos: result.length,  // Conta quantos resultados geraram
                pedidos: result.map(pedido => { // Modificando valor à retornar
                    return {
                        id_pedido: pedido.id_pedido,
                        quantidade: pedido.quantidade,
                        produto: {
                            id_produto: pedido.id_produto,
                            nome: pedido.nome,
                            preco: pedido.preco
                        },
                        type_request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um pedido específico',
                            url: process.env.URL_API + 'pedidos/' + pedido.id_pedido // URL individual do produto, ideal que seja var de ambiente
                        }
                    }
                })
            }
            return res.status(200).send(response)
        })
    });
});


// EXEMPLO POST, insere um pedido
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error : error })}
        conn.query('SELECT * FROM produtos WHERE id_produto = ?', // Executa 1° query
        [req.body.id_produto],
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })}
            if (result.length == 0) { // Validação de ID, se existe
                return res.status(404).send({ // Código 404 -> not found
                    mensagem: 'Produto não encontrado'
                })
            }
            conn.query('INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)', // Executa 2° query
                    [req.body.id_produto, req.body.quantidade],
                    (error, result, field) => { //callback
                        conn.release(); // Libera a conexão
                        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
                        const response = {
                            mensagem: 'Pedido inserido com sucesso',
                            pedidoCriado: {
                                id_pedido: result.id_pedido,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                type_request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os pedidos',
                                    url: process.env.URL_API + 'pedidos' // Ideal que seja var de ambiente
                                }
                            }
                        }
                        return res.status(201).send(response);
                    })
        })
    });
});


// EXEMPLO POST, retorna os dados de um pedido
router.get('/:id_pedido', (req, res, next) => { // Lista de um pedido em específico
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
        conn.query('SELECT * FROM pedidos WHERE id_pedido = ?;',
        [req.params.id_pedido], // Pega do parâmetro lá em cima
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
            if (result.length == 0) {
                return res.status(404).send({ // Código 404 -> not found
                    mensagem: 'Não foi encontrado pedido com este ID'
                })
            }
            const response = {
                pedido: {
                    id_pedido: result[0].id_pedido,
                    id_produto: result[0].id_produto,
                    quantidade: result[0].quantidade,
                    type_request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os pedidos',
                        url: process.env.URL_API + 'pedidos' // Ideal que seja var de ambiente
                    }
                }
            }
            return res.status(200).send(response)
        })
    });
});


// EXEMPLO DELETE, exclui um pedido
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => { // Pega uma conexão do pool de conexões
        if (error) { return res.status(500).send({ error : error })}
        conn.query(`DELETE FROM pedidos WHERE id_pedido = ?`, [req.body.id_pedido],
                    (error, result, field) => { //callback
                        conn.release(); // Libera a conexão
                        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
                        const response = {
                            mensagem: 'Pedido removido com sucesso',
                            type_request: {
                                tipo: 'POST',
                                descricao: 'Insere um pedido novo',
                                url: 'http://localhost3000/pedidos',
                                body_req: {
                                    id_produto: 'Number',
                                    quantidade: 'Number'
                                }
                            }
                        }
                        return res.status(202).send(response);
                    })
    });
});
module.exports = router;