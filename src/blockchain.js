const Block = require("./block");
const Transacao = require("./transacao");

class Blockchain{

    chain = [];
    pendingTransaction = [];

    constructor(){
        const genesisBlock = Block.genesis();
        this.chain.push(genesisBlock);
    }

    createTransaction(from, to, value){
        const transacao = new Transacao(from, to, value);
        if(transacao.validateTransaction()){
            transacao.numTransacao = this.pendingTransaction.length;
            this.pendingTransaction.push(transacao);
            return true;
        }
        return false;
    }

    createBlock(){
        for(let i = 0; i < this.pendingTransaction.length; i++){
            const transacao = this.pendingTransaction[i];
            if(!transacao.from || !transacao.to || !transacao.value){
                console.log("Transações inválidas. Preencha todos os campos de todas as transações");
                return false;
            }
        }
    
        const newBlock = Block.mineBlock(this.ultimoBloco(), this.pendingTransaction);
        this.chain.push(newBlock);
        this.pendingTransaction = [];
        console.log("Bloco adicionado a rede!!!");
        
        return true;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const blocoAtual = this.chain[i];
            const blocoAnterior = this.chain[i-1];
            
            if(blocoAtual.hashAnterior != blocoAnterior.hash){
                return false;
            }

            if(blocoAtual.hashAnterior != Block.hash(blocoAnterior.timestamp, blocoAnterior.hashAnterior, blocoAnterior.transacao)){
                return false;
            }
            
            return true;
        }
    }

    ultimoBloco(){        
        return this.chain[this.chain.length-1];
    }

    toString(){
        return `${this.chain}`;
    }

}

module.exports = Blockchain;