const { response } = require('express');
const express = require('express');
const router  = express.Router();
const mysql   = require('../mysql').pool;


// EXEMPLO GET, retorna todos os produtos
router.get('/', (req, res, next) => { // Lista com todos os produtos
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
        conn.query('SELECT * FROM tb_produtos;',
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
            const response = {
                quantidade: result.length,  // Conta quantos resultados geraram
                produtos: result.map(prod => { // Modificando valor à retornar
                    return {
                        id_produto: prod.id,
                        nome: prod.nome_prod,
                        preco: prod.preco_prod,
                        categoria: prod.categoria_prod,
                        codigo: prod.cod_prod
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
        conn.query('INSERT INTO tb_produtos (nome_prod, preco_prod, categoria_prod, cod_prod, idUsuario) VALUES (?,?,?,?,?)',
                    [req.body.nome_prod, req.body.preco_prod, req.body.categoria_prod, req.body.cod_prod, req.body.idUsuario],
                    (error, result, field) => { //callback
                        conn.release(); // Libera a conexão
                        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
                        const response = {
                            mensagem: 'Produto inserido com sucesso',
                            produtoCriado: {
                                id_produto: result.id,
                                nome: req.body.nome_prod,
                                preco: req.body.preco_prod,
                                categoria: req.body.categoria_prod,
                                codigo: req.body.cod_prod
                            }
                        }
                        return res.status(201).send(response);
                    })
    });
});


// EXEMPLO GET, retorna os dados de um produto
router.get('/:id', (req, res, next) => { // Lista de um produto em específico
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
        conn.query('SELECT * FROM tb_produtos WHERE id = ?;',
        [req.params.id], // Pega do parâmetro lá em cima
        (error, result, field) => {
            if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
            if (result.length == 0) {
                return res.status(404).send({ // Código 404 -> not found
                    mensagem: 'Não foi encontrado produto com este ID'
                })
            }
            const response = {
                produto: {
                    id_produto: result[0].id,
                    nome: result[0].nome_prod,
                    preco: result[0].preco_prod,
                    categoria: result[0].categoria_prod,
                    codigo: result[0].cod_prod
                }
            }
            return res.status(200).send(response)
        })
    });
});


// EXEMPLO DELETE, exclui um produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => { // Pega uma conexão do pool de conexões
        if (error) { return res.status(500).send({ error : error })}
        conn.query(`DELETE FROM tb_produtos WHERE id = ?`, [req.body.id],
                    (error, result, field) => { //callback
                        conn.release(); // Libera a conexão
                        if (error) { return res.status(500).send({ error : error })} // Se tiver um erro retorna o próprio erro
                        const response = {
                            mensagem: 'Produto removido com sucesso',
                        }
                        return res.status(202).send(response);
                    })
    });
});
module.exports = router;