const SHA256 = require('crypto-js/sha256');
const Transacao = require('./transacao');

class Block{

    hash;
    hashAnterior;
    nonce;
    timestamp;
    transactions = [];
    static difficulty = 3;
    static baseMineValue;
    
    constructor(timestamp, hashAnterior, hash, transactions = [], nonce){
        this.timestamp = timestamp;
        this.hashAnterior = hashAnterior;
        this.hash = hash;
        this.transactions = transactions;
        this.nonce = nonce;
        this.baseMineValue = 0.0000000010;
    }

    toString(){
        return `
        Block: 
            Hash: ${this.hash.substring(0, 15)}
            HashAnterior: ${this.hashAnterior.substring(0, 15)}
            Nonce: ${this.nonce}
            Timestamp: ${this.timestamp}
            Transactions [ ${this.transactions} 
            ]
            `
    }

    static genesis(){
        const init = []; 
        const timestamp = Date.now();
        const genTransacao = new Transacao("genRemetente", "genDestinatario", 1);
        init.push(genTransacao);
        return new this(timestamp, '7', Block.hash(timestamp, '7', init, 1), init, 1);
    }

    mineTransaction(transacoes, addresses){

        const firstAddress = [...addresses.keys()][0];
        let recieveTot = 0;

        for(let transacao of transacoes){
            recieveTot = parseFloat(recieveTot) + parseFloat(transacao.mineValueForMiner)            
        }

        const saldoAtual = addresses.get(firstAddress);
        
        addresses.set(firstAddress, saldoAtual + recieveTot);

        console.log(`Recompensa total de ${recieveTot} atribuída ao minerador (${firstAddress})`);
    }

    static mineBlock(ultimoBloco, transacao){
        let nonce = 0;
        const timestamp = Date.now();
        const ultimoHash = ultimoBloco.hash;
        let hash;

        do{

            hash = Block.hash(timestamp, ultimoHash, transacao, nonce++);

        } while (hash.substring(0, Block.difficulty) !== '0'.repeat(Block.difficulty));

        console.log(`Bloco minerado na tentativa: ${nonce}`);

        return new this(timestamp, ultimoHash, hash, transacao, nonce);
    }

    static hash(timestamp, ultimoHash, transacao, nonce){
        return SHA256(`${timestamp}${ultimoHash}${transacao}${nonce}`).toString();
    }

    
}

module.exports = Block;