const Block = require("./block");
const Transacao = require("./transacao");

class Blockchain{

    chain = [];
    pendingTransaction = [];

    constructor(){
        const genesis = Block.genesis();
        this.chain.push(genesis);
    }

    // validateBlockchain(){
    //     for (let i = 0; i < this.chain.length; i++) {
    //         if(chain[i].hashAnterior != chain){

    //         }
            
    //     }
    // }

    createTransaction(remetente, destinatario, valor){
        const transacao = new Transacao(remetente, destinatario, valor);
        this.pendingTransaction.push(transacao);
    }

    createBlock(pendingTransaction = []){
        for(let i = 0; i < pendingTransaction.length; i++){
            const transacao = pendingTransaction[i];
            if(!transacao.remetente){
                console.log("TÁ NULO");
                
            }
        }
    }

    toString(){
        return `${this.chain}`;
    }

}

module.exports = Blockchain;