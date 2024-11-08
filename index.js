const Blockchain = require('./src/blockchain.js');

const blockchain = new Blockchain();
console.log("Iniciando blockchain.....\n");

console.log("Criando transações");

blockchain.createTransaction("06972ed6d", "ab0845497", 1);
blockchain.createTransaction("36bc639c0", "0a50da1e7", 15);
blockchain.createTransaction("36bc639c0", "0a50da1e7", 20);

console.log("Criando bloco");
blockchain.createBlock();

blockchain.createTransaction("06972ed6d", "ab0845497", 14);
blockchain.createTransaction("36bc639c0", "0a50da1e7", 20);
blockchain.createTransaction("36bc639c0", "0a50da1e7", 4);
blockchain.createTransaction("0a50da1e7", "ab0845497", 20);

console.log("Criando segundo bloco");
blockchain.createBlock();

console.log(blockchain.toString());

console.log("Histórico de transação do endereço '06972ed6d'");
blockchain.transactionHistory("06972ed6d");

console.log("\nHistórico de transação do endereço '0a50da1e7'");
blockchain.transactionHistory("0a50da1e7");


console.log("\nA blockchain está válida?")
if(blockchain.isChainValid()){
    console.log("Blockchain está valida");
    
} else {
    console.log("Blockchain inválida");
}