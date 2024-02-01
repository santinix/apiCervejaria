import express from 'express'
const router = express.Router()
import { postCervejas, getCervejas, getCervejasId, putAlterarCervejas, deleteCervejas} from '../controller/cervejaria.js'

// Listagem de informações
router.get('/cervejas', getCervejas)
router.get('/cervejas/:id', getCervejasId)


// //Criar informações/dados
router.post('/cervejas', postCervejas)

// //Atualizar informações
router.put('/cervejas/:id', putAlterarCervejas)

// //Apagar informações
router.delete('/cervejas/:id', deleteCervejas)


export { router }