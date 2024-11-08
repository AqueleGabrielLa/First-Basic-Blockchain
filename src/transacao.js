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
        
        if(!this.isHex(this.from) || !this.isHex(this.to) || (this.to.length != 9) || (this.from.length != 9)){
            console.error("Endereço inválido");
            return false;
        }
        console.log(`transição de número ${this.number} adicionada a lista de transações pendentes!`);
        
        return true;
    }

    isHex(h) {

        return /^[0-9a-fA-F]+$/.test(h);
    }

}

module.exports = Transacao;