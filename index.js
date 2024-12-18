const readline = require('node:readline');
const Node = require('./src/node.js');

const nodes = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function iniMenu(){
    console.log(`Criando o nó inicial...`);

    const node1 = new Node();
    nodes.push(node1);
    Node.connectedNodes.push(node1);
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
                Node.connectedNodes.push(newNode);
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