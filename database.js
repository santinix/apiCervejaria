import { Sequelize } from 'sequelize'

console.log(process.env.BANCO_DE_DADOS)
const sequelize = new Sequelize (process.env.BANCO_DE_DADOS)

try {
    await sequelize.authenticate()
    console.log('Conexão bem sucedida')
}catch(erro){
    console.log(erro)
}

export { sequelize }