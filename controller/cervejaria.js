import { Cerveja } from "../models/Cervejaria.js"


const getCervejas = async (req, res) => {
    try{
        //PARA LISTAR POR NOMES
    // const cervejas = await Cerveja.findAll( {attributes: ["nome"]})
    const cervejas = await Cerveja.findAll()
  

    res.status(200).send({message: 'Cervejas encontradas', data: cervejas})
    }catch(erro){
        console.log(erro)
        res.status(500).send({message: 'Hove um erro na busca'})
    }
    
}

const getCervejasId = async (req, res) => {
    try{
        const {id} = req.params
        const cervejas = await Cerveja.findByPk(id)
        if(!id){
            return res.status(400).send({message: "Informar um ID válido"})
        }

        if(cervejas){
            res.status(200).send({message: "Cerveja encontrada", cervejas})
        }

    }catch(erro){
        res.status(500).send({message: "Erro na busca"})
    }
}

const postCervejas = async (req, res) => {
    try {
    const { nome, abv, tipo, nacionalidade } = req.body
    if (!nome || !abv || !tipo || !nacionalidade) {
        return res.status(400).send({ message: 'Dados incompletos' })
    }

    const novaCerveja = { nome, abv, tipo, nacionalidade }
    const resultado = await Cerveja.create(novaCerveja)
    res.status(201).send({ message: 'Cerveja adicionada com sucesso', data: resultado })
    }catch(erro){
        res.status(500).send({ message: 'Houve um erro na criação'})
    }
}

const putAlterarCervejas = async (req, res) => {
    try {
        const {id} = req.params
        const { nome, abv, tipo, nacionalidade } = req.body
        if (!nome || !abv || !tipo || !nacionalidade) {
            return res.status(400).send({ message: 'Dados incompletos' })
        }
        const alterarCerveja = { nome, abv, tipo, nacionalidade }
        const resultado = await Cerveja.update(alterarCerveja, {where: {id: id}})
        res.status(200).send({message: "Cerveja atualizada", resultado})

        
    }catch(erro){
        res.status(500).send({message: "Houve um erro na atualização"})
    }



}

const deleteCervejas = async (req,res) =>{
    try{
        const {id} = req.params
        if(!id){
            return res.status(404).send({message: 'Informar ID'})
        }
        await Cerveja.destroy({where: {id}})
        res.status(200).send({message: 'Cerveja excluída'})
    }catch(erro){
        res.status(500).send({message: "Houve um erro ao excluir a cerveja"})
    }
}

export { getCervejas, getCervejasId, postCervejas, putAlterarCervejas, deleteCervejas }