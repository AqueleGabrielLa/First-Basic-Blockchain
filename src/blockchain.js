const Block = require("./block");
const Transacao = require("./transacao");

class Blockchain{

    chain = [];
    pendingTransaction = [];
    static addresses;

    constructor(){
        const genesisBlock = Block.genesis();
        this.chain.push(genesisBlock);
        this.addresses = new Map();
    }

    createTransaction(from, to, value){
        const transacao = new Transacao(from, to, value);

        if(transacao.validateTransaction(this.addresses)){
            transacao.numTransacao = this.pendingTransaction.length;
            this.pendingTransaction.push(transacao);
            console.log("Transação criada com sucesso!! Adicionada a lista de transações pendentes. Minere o bloco para adiciona-lo a blockchain");
            return true;
        }
        return false;
    }

    createBlock(){
        const newBlock = Block.mineBlock(this.ultimoBloco(), this.pendingTransaction);

        newBlock.mineTransaction(this.pendingTransaction, this.addresses);
        this.fromPay();
        this.chain.push(newBlock);

        this.pendingTransaction = [];
        console.log("Bloco adicionado à rede!!!");

        const firstAddress = [...this.addresses.keys()][0];
        console.log(this.addresses.get(firstAddress));
        
        
        return true;
    }

    fromPay(){
        for(let transacao of this.pendingTransaction){
            const actual = parseFloat(this.addresses.get(transacao.from));
            const tot = (parseFloat(transacao.value) + parseFloat(transacao.mineValueForMiner));
            
            if(actual < tot  - Number.EPSILON){
                console.log(`Saldo insuficiente para ${transacao.from}. Transação ignorada.`);
                continue;
            }

            const newSaldo = Math.round((actual - tot) * 100) / 100;
            
            this.addresses.set(transacao.from, newSaldo);
        }
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const blocoAtual = this.chain[i];
            const blocoAnterior = this.chain[i-1];
            
            if(blocoAtual.hashAnterior != blocoAnterior.hash){
                console.error("BLOCKCHAIN INVÁLIDA. Há um Bloco na rede com hash alterado");
                return false;
            }        

            if(blocoAtual.hashAnterior != Block.hash(blocoAnterior.timestamp, blocoAnterior.hashAnterior, blocoAnterior.transactions, blocoAnterior.nonce)){
                console.error("BLOCKCHAIN INVÁLIDA. Bloco com dados alterados. Descoberto a partir do recalculo dos hash");
                
                return false;
            }
            
            return true;
        }
    }

    isInChain(address){    
        for(let block of this.chain){
            for(let transacao of block.transactions){
                if(transacao.from == address || transacao.to == address){
                    return true;
                }
            }
        }
        return false;
    }

    getHistoryTransaction(transactions, address){
        transactions.forEach(element => {
            if(address === element.from && address != element.to) {
                console.log(`Address ${address} sent ${element.value} tokens to ${element.to}`);
            } else if(address === element.to && address != element.from){
                console.log(`Address ${address} recieved ${element.value} tokens from ${element.from}`);
            } 
        });
    }

    ultimoBloco(){        
        return this.chain[this.chain.length-1];
    }

    toString(){
        return `${this.chain}`;
    }

    static getDifficulty(){
        return this.difficulty;
    }
}

module.exports = Blockchain;