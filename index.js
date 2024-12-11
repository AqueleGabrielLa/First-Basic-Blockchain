const Blockchain = require('./src/blockchain.js');
const readline = require('node:readline');
const helper = require('./src/helpers.js');
const Node = require('./src/node.js');

// const blockchain = new Blockchain();
// console.log("Iniciando blockchain.....\n");

// addresses = [];

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function exibirMenu() {
//   rl.question(`\n1 - Criar transação\n2 - Criar endereço\n3 - Ver endereços disponíveis\n4 - Minerar bloco\n5 - Visualizar blockchain\n6 - Verificar histórico de tokens\n0 - Encerrar programa\nDigite o número da opção desejada: `, (op) => {
    
//     switch(op) {
//         case '1':
//             const criarTransacao = async () => {
//                 try {
//                     const from = await helper.questionA(`Digite o endereço que enviará tokens: `, rl);
//                     const to = await helper.questionA(`Digite o endereço que receberá tokens: `, rl);
//                     const value = await helper.questionA(`Digite a quantidade de tokens a ser transferida: `, rl);
            
//                     blockchain.createTransaction(from, to, value);
//                 } catch (error) {
//                     console.error(`Erro ao criar transação:`, error);
//                 } finally {
//                     exibirMenu();
//                 }
//             };
//             criarTransacao();
//             break;
//         case '2':
//             addresses.push(helper.genAddress());
//             break;
//         case '3':
//             helper.listAddress(addresses);
//             break;
//         case '4':
//             blockchain.createBlock();
//             break;
//         case '5':
//             console.log(blockchain.toString());
//             break;
//         case '6':
//             rl.question(`Digite o endereço que deseja verificar o histórico: `, (address) => {
//                 if(helper.isValidAddress(address)) blockchain.transactionHistory(address, addresses);
//                 else console.error("Endereço inválido!");
//                 exibirMenu();
//             })
//             break;
//         case '0':
//             console.log('Encerrando o programa...');
//             rl.close(); 
//             return;
//         default:
//             console.log('Opção inválida. Por favor, escolha uma opção válida.');
//         }

//     exibirMenu();
//   });
// }

// exibirMenu();

// rl.on('close', () => {
//   console.log('Programa encerrado.');
//   process.exit(0);
// });


node1 = new Node();
node2 = new Node();
node3 = new Node();


console.log(node1.id + " " + node2.id + " " + node3.id);
