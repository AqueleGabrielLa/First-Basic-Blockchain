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
        if(!this.isHex(this.from) || !this.isHex(this.to) || (this.to.length != 30) || (this.from.length != 30)){
            console.error("Endereço inválido");
            return false;
        }
        
        //console.log(`Transação de número ${this.numTransacao} adicionada a lista de transações pendentes!`);
        console.log("Transação criada com sucesso!!");
        return true;
    }

    isHex(h) {

        return /^[0-9a-fA-F]+$/.test(h);
    }

}

module.exports = Transacao;