const Blockchain = require('./src/blockchain.js');
const readline = require('node:readline');
const helper = require('./src/helpers.js');
const Node = require('./src/node.js');

const nodes = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// function exibirMenu(node) {
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
//             node.blockchain.createBlock();
//             break;
//         case '5':
//             console.log(node.blockchain.toString());
//             break;
//         case '6':
//             rl.question(`Digite o endereço que deseja verificar o histórico: `, (address) => {
//                 if(helper.isValidAddress(address)) node.blockchain.transactionHistory(address, node.addresses);
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



function iniMenu(){
    console.log(`Criando o nó inicial...`);

    const node1 = new Node();
    nodes.push(node1);

    console.log(`Nó criado com id: ${node1.id}`);
    
    menuNodes(node1);

}

function menuNodes(node){
    console.log(`Nó selecionado: ${node.id}`);
    rl.question(`\n1 - Menu do nó\n2 - Criar nó\n3 - Selecionar nó\n0 - Encerrar programa\n`, (op) => {
        switch(op){
            case '1':
                node.menu(rl, () => {
                    console.log("Retornando ao menu principal...");
                    menuNodes(node);
                });
                break;
            case '2':
                const newNode = new Node();
                nodes.push(newNode);
                console.log(`Nó criado com id ${newNode.id}`);
                menuNodes(newNode);                
                break;
            case '3':
                console.log("Selecione um nó: ");
                nodes.forEach((n, index) => {
                    console.log(`${index + 1} - Nó id: ${n.id}`);
                });
                rl.question(`Selecione o número do nó desejado: `, (index) => {
                    const selectedNode = nodes[parseInt(index) - 1];
                    if(selectedNode){
                        console.log(`Nó com id ${selectedNode.id} selecionado`);
                        menuNodes(selectedNode);
                    } else {
                        console.log(`Opção inválida. Tente novamente`);
                        menuNodes(node);                        
                    }
                });
                break;
            case '0':
                console.log(`Encerrando o programa...`);
                rl.close();
                break;
            default:
                console.log(`Opção inválida. Por favor, escolha uma opção válida.`);
                menuNodes(node);
        }
    });
}



iniMenu();

//node1.on("syncNeeded", () => { node1.updateChain() });

