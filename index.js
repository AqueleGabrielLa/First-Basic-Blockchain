const Block = require('./src/block.js');
const Blockchain = require('./src/blockchain.js');

const blockchain = new Blockchain();
console.log("Iniciando blockchain.....");
console.log(blockchain.toString());

blockchain.createTransaction("zebra", "leão", 1);
blockchain.createTransaction("leão", "girafa", 15);
