module.exports = () => class {
    constructor(id = null, username, password, name, cpf, balance){
        this.id = id
        this.username = username
        this.cpf = cpf
        this.password = password
        this.name = name
        this.balance = balance
    }
}