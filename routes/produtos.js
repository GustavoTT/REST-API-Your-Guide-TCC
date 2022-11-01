const { response } = require('express');
const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').pool;


// EXEMPLO GET, retorna todos os produtos
router.get('/', (req, res, next) => { // Lista com todos os produtos
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
        conn.query('SELECT * FROM produtos;',
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
            const response = {
                quantidade: result.length,  // Conta quantos resultados geraram
                produtos: result.map(prod => { // Modificando valor à retornar
                    return {
                        id_produto: prod.id_produto,
                        nome: prod.nome,
                        preco: prod.preco,
                        type_request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: process.env.URL_API + '/produtos/' + prod.id_produto // URL individual do produto, ideal que seja var de ambiente
                        }
                    }
                })
            }
            return res.status(200).send(response)
        })
    });
});


// EXEMPLO POST, insere um produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => { // Pega uma conexão do pool de conexões
        if (error) { return res.status(500).send({ error : error })}
        conn.query('INSERT INTO produtos (nome, preco) VALUES (?,?)',
                    [req.body.nome, req.body.preco],
                    (error, result, field) => { //callback
                        conn.release(); // Libera a conexão
                        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
                        const response = {
                            mensagem: 'Produto inserido com sucesso',
                            produtoCriado: {
                                id_produto: result.id_produto,
                                nome: req.body.nome,
                                preco: req.body.preco,
                                type_request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os produto',
                                    url: process.env.URL_API + '/produtos' // Ideal que seja var de ambiente
                                }
                            }
                        }
                        return res.status(201).send(response);
                    })
    });
});


// EXEMPLO GET, retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => { // Lista de um produto em específico
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
        conn.query('SELECT * FROM produtos WHERE id_produto = ?;',
        [req.params.id_produto], // Pega do parâmetro lá em cima
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
            if (result.length == 0) {
                return res.status(404).send({ // Código 404 -> not found
                    mensagem: 'Não foi encontrado produto com este ID'
                })
            }
            const response = {
                produto: {
                    id_produto: result[0].id_produto,
                    nome: result[0].nome,
                    preco: result[0].preco,
                    type_request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os produto',
                        url: process.env.URL_API + '/produtos' // Ideal que seja var de ambiente
                    }
                }
            }
            return res.status(200).send(response)
        })
    });
});


// EXEMPLO PATCH, altera um produto
router.patch('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };
    mysql.getConnection((error, conn) => { // Pega uma conexão do pool de conexões
        if (error) { return res.status(500).send({ error : error })}
        conn.query(`UPDATE produtos
                        SET nome  = ?,
                            preco = ?
                    WHERE id_produto = ?`,
                    [req.body.nome, req.body.preco, req.body.id_produto],
                    (error, result, field) => { //callback
                        conn.release(); // Libera a conexão
                        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
                        const response = {
                            mensagem: 'Produto atualizado com sucesso',
                            produtoAtualizado: {
                                id_produto: req.body.id_produto,
                                nome: req.body.nome,
                                preco: req.body.preco,
                                type_request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna os detalhes de um produto específico',
                                    url: process.env.URL_API + '/produtos/' + req.body.id_produto // URL individual do produto, ideal que seja var de ambiente
                                }
                            }
                        }
                        return res.status(202).send(response);
                    })
    });
});


// EXEMPLO DELETE, exclui um produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => { // Pega uma conexão do pool de conexões
        if (error) { return res.status(500).send({ error : error })}
        conn.query(`DELETE FROM produtos WHERE id_produto = ?`, [req.body.id_produto],
                    (error, result, field) => { //callback
                        conn.release(); // Libera a conexão
                        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
                        const response = {
                            mensagem: 'Produto removido com sucesso',
                            type_request: {
                                tipo: 'POST',
                                descricao: 'Insere um produto',
                                url: process.env.URL_API + '/produtos',
                                body_req: {
                                    nome: 'String',
                                    preco: 'Number'
                                }
                            }
                        }
                        return res.status(202).send(response);
                    })
    });
});
module.exports = router;