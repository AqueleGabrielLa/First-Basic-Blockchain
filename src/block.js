const SHA256 = require('crypto-js/sha256');

class Block{

    timestamp;
    hashAnterior;
    hash;
    transacao = [];

    constructor(timestamp, hashAnterior, hash, transacao = []){

        this.timestamp = timestamp;
        this.hashAnterior = hashAnterior;
        this.hash = hash;
        this.transacao = transacao;

    }

    toString(){
        return `Block: 
                Timestamp: ${this.timestamp}
                HashAnterior: ${this.hashAnterior.substring(0, 15)}
                Hash: ${this.hash.substring(0, 15)}
                Transacoes [ ${this.transacao}
                ]
                `
    }

    static genesis(){
        const init = []; 
        init.push("init", "initDest", 1);
        return new this(Date.now(), '0', 'ddddddd', init);

    }

    static mineBlock(ultimoBloco, transacao){
        const timestamp = Date.now();
        const ultimoHash = ultimoBloco.hash;
        const hash = Block.hash(timestamp, ultimoHash, transacao);

        return new this(timestamp, ultimoHash, hash, transacao);
    }

    static hash(timestamp, ultimoHash, transacao){
        return SHA256(`${timestamp}${ultimoHash}${transacao}`).toString();
    }
}

module.exports = Block;