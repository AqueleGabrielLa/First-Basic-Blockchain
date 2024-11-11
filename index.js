const Blockchain = require('./src/blockchain.js');
const readline = require('node:readline');
const helper = require('./src/helpers.js');
const Transacao = require('./src/transacao.js');

const blockchain = new Blockchain();
console.log("Iniciando blockchain.....\n");

addresses = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function exibirMenu() {
  rl.question(`\n1 - Criar transação\n2 - Criar chave\n3 - Ver endereços disponíveis\n4 - Minerar bloco\n5 - Visualizar blockchain\n6 - Verificar histórico de tokens\n0 - Encerrar programa\nDigite o número da opção desejada: `, (op) => {
    
    switch(op) {
        case '1':
            const criarTransacao = async () => {
                try {
                    const from = await helper.questionA(`Digite o endereço que enviará tokens: `, rl);
                    const to = await helper.questionA(`Digite o endereço que receberá tokens: `, rl);
                    const value = await helper.questionA(`Digite a quantidade de tokens a ser transferida: `, rl);
            
                    blockchain.createTransaction(from, to, value);
                } catch (error) {
                    console.error('Erro ao criar transação:', error);
                } finally {
                    exibirMenu();
                }
            };
            criarTransacao();
            break;
        case '2':
            addresses.push(helper.genAddress());
            break;
        case '3':
            helper.listAddress(addresses);
            break;
        case '4':
            blockchain.createBlock();
            break;
        case '5':
            console.log(blockchain.toString());
            break;
        case '6':
            rl.question(`Digite o endereço que deseja verificar o histórico: `, (address) => {
                if(helper.isValidAddress()){
                    blockchain.transactionHistory(address);
                    return;
                } else {
                    console.error("Endereço inválido!");
                }
            })
            break;
        case '0':
            console.log('Encerrando o programa...');
            rl.close(); 
            return;
        default:
            console.log('Opção inválida. Por favor, escolha uma opção válida.');
        }

    exibirMenu();
  });
}

exibirMenu();

rl.on('close', () => {
  console.log('Programa encerrado.');
  process.exit(0);
});


// console.log("Criando transações");

// blockchain.createTransaction("06972ed6d", "ab0845497", 1);
// blockchain.createTransaction("36bc639c0", "0a50da1e7", 15);
// blockchain.createTransaction("36bc639c0", "0a50da1e7", 20);

// console.log("Criando bloco");
// blockchain.createBlock();

// blockchain.createTransaction("06972ed6d", "ab0845497", 14);
// blockchain.createTransaction("36bc639c0", "0a50da1e7", 20);
// blockchain.createTransaction("36bc639c0", "0a50da1e7", 4);
// blockchain.createTransaction("0a50da1e7", "ab0845497", 20);

// console.log("Criando segundo bloco");
// blockchain.createBlock();

// console.log(blockchain.toString());

// console.log("Histórico de transação do endereço '06972ed6d'");
// blockchain.transactionHistory("06972ed6d");

// console.log("\nHistórico de transação do endereço '0a50da1e7'");
// blockchain.transactionHistory("0a50da1e7");


// console.log("\nA blockchain está válida?")
// if(blockchain.isChainValid()){
//     console.log("Blockchain está valida");
    
// } else {
//     console.log("Blockchain inválida");
// }