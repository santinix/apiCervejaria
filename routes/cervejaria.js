import express from 'express'
const router = express.Router()
import { postCervejas, getCervejas, getCervejasId, putAlterarCervejas, deleteCervejas} from '../controller/cervejaria.js'
import {login, validacao, cadastrarUsuario} from '../controller/autenticacao.js'

//login
router.post('/login', login)
router.post('/cadastrar', cadastrarUsuario)

// Listagem de informações
router.get('/cervejas', validacao, getCervejas)
router.get('/cervejas/:id', getCervejasId)


// //Criar informações/dados
router.post('/cervejas', postCervejas)

// //Atualizar informações
router.put('/cervejas/:id', putAlterarCervejas)

// //Apagar informações
router.delete('/cervejas/:id', deleteCervejas)


export { router }