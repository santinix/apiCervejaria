import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import {Usuario} from '../models/Usuario.js'



const login = (req, res) => {
    // const {usuario, senha} = req.body
    // usuario.findOne(
    //     {
    //         where: { usuario: usuario}
    //     }
    // )

    //Simulação de autenticação do usuario
    if(usuario = 'ruan' && senha == 123){
        // GERAÇÃO DO TOKEN
        const permissoes = {tipo: 'comum'}
        const chave = process.env.CHAVE
        const token = jwt.sign(permissoes, chave, {expiresIn: '120'})
        console.log(token)
        return res.status(200).send({token})
    }

    res.status(400).send({message:'Credenciais incorretas'})


}


const validacao = (req, res, next) => {
    try {
        
        console.log(req.headers)
        const {authorization} = req.headers
        const chave = process.env.CHAVE
        const verificacao = jwt.verify(authorization, chave)
        
        if(!verificacao.tipo){
           return res.status(400).send({message: 'Token invalido'})

        }
        req.tipoUsuario = verificacao.tipo
        next()

    }catch(erro){
        res.status(400).send({message: 'falha na autenticação'})
    }
    

}


const cadastrarUsuario = async (req, res) =>{
    try{
        const { nome, senha} = req.body
        if(!nome || !senha){
            return res.status(400).send({message: 'informações incompletas'})
        }
    
        const senhaParaArmazenar = gerarCripto(senha)
        // Ideal verificar se já existe usuario antes de criar
        await Usuario.create({nome, senha: senhaParaArmazenar})
        res.status(200).send({message: "usuario criado com sucesso"})

    }catch(erro){
        res.status(500).send({message: 'Falha na autenticação'})
    }
    

}

const gerarCripto = (senha) =>{
    const salt = process.env.SALT
    const novaSenha = crypto.createHash('sha256').update(valor + salt).digest('base64')
    return novaSenha
}

export {login, validacao, cadastrarUsuario}