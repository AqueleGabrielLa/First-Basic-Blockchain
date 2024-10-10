class Transacao{

    remetente;
    destinatario;
    valor;

    constructor(remetente, destinatario, valor){
        this.remetente = remetente;
        this.destinatario = destinatario;
        this.valor = valor;
    }

    toString(){
        return `
                    Remetente: ${this.remetente} Destinatario: ${this.destinatario} Valor: ${this.valor}`
    }

}

module.exports = Transacao;