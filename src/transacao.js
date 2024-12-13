const helper = require('./helpers.js');
class Transacao{

    mineValueForMiner;

    constructor(from, to, value){
        this.from = from;
        this.to = to;
        this.value = value;
        this.fee = value * 0.02;
    }

    toString(){
        return `
                Número da Transação: ${this.numTransacao} Remetente: ${this.from} Destinatario: ${this.to} Valor: ${this.value}`
    }

    validateTransaction(addresses){

        if(!addresses.has(this.from)){
            console.log(`Endereço remetente não existe`);
            return false;
        }

        const saldoRemetente = parseFloat(addresses.get(this.from));
        const custoTotal = parseFloat(this.value) + parseFloat(this.fee) //+ Block.baseMineValue;

        if(saldoRemetente < custoTotal){
            console.log(`Remetente não tem saldo suficiente pra concluir a transação.`);
            return false;
        }

        if(!helper.isHex(this.from) || !helper.isHex(this.to) || (this.to.length != 30) || (this.from.length != 30)){
            console.error("Endereço inválido. Remetente ou destinatário não segue o formato esperado.");
            return false;
        }

        this.mineValueForMiner = this.fee + 0.000000010;

        return true;
    }
}

module.exports = Transacao;