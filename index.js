const Blockchain = require('./src/blockchain.js');

const blockchain = new Blockchain();
console.log("Iniciando blockchain.....\n");

console.log("Criando transações");
blockchain.createTransaction("zebra", "leão", 1);
blockchain.createTransaction("leão", "girafa", 15);

console.log("Criando bloco");
blockchain.createBlock();

console.log("Criando as segundas transações");
blockchain.createTransaction("João", "Maria", 500);
blockchain.createTransaction("Maria", "Pedro", 1000);

console.log("Criando segundo bloco");
blockchain.createBlock();

console.log(blockchain.toString());

console.log("A blockchain está válida?")
if(blockchain.isChainValid()){
    console.log("Blockchain está valida");
    
} else {
    console.log("Blockchain inválida");

}