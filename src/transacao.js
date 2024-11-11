const helper = require('./helpers.js');
class Transacao{

    constructor(from, to, value){
        this.from = from;
        this.to = to;
        this.value = value;
    }

    toString(){
        return `
                Número da Transação: ${this.numTransacao} Remetente: ${this.from} Destinatario: ${this.to} Valor: ${this.value}`
    }

    validateTransaction(){
        if(!helper.isHex(this.from) || !helper.isHex(this.to) || (this.to.length != 30) || (this.from.length != 30)){
            console.error("Endereço inválido");
            return false;
        }
        return true;
    }
}

module.exports = Transacao;