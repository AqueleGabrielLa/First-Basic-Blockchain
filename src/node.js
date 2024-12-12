const Blockchain = require("./blockchain")
const EventEmitter = require('events');
const helper = require('./helpers');

class Node extends EventEmitter{

    blockchain;
    static id = 0;
    addresses;
    connectedNodes = [];

    constructor(){
        super();
        this.blockchain = new Blockchain();
        this.addresses = new Map();
        this.id = ++this.constructor.id;
    }

    recieveChain(chain){
        console.log(`Node with ${this.id} recieved a chain. Validating this chain...`);
        
        if(chain.length > this.blockchain){
            this.blockchain = chain;
            console.log(`Blockchain updated. Longer chain adopted`);
            this.emit("chainUpdated", chain);
            this.propagateChain();
        } else {
            console.log(`Node with id ${this.id} has a longer chain`);
            this.emit("syncNeeded");
        }
    }

    connectNode(newNode){
        this.connectedNodes.push(newNode);
        console.log(`Node with the id ${newNode.id} is now connected node ${this.id}`);
        newNode.on("chainUpdated", (updatedChain) => this.recieveChain(updatedChain));
    }

    propagateChain(){
        for(let node of this.connectedNodes){
            node.recieveChain(this.blockchain);
        }
    }

    updateChain(){
        for(let node of this.connectedNodes){
            if(node.blockchain.chain.length > this.blockchain.chain.length){
                this.blockchain = node.blockchain;
            }
        }
    }

    menu(rl){
        rl.question(`\n1 - Visualizar blockchain\n2 - Atualizar blockchain\n3 - Progragar blockchain\n4 - Criar transação\n5 - Criar endereço\n6 - Ver seus endereços\n7 - Minerar bloco\n8 - Verificar histórico de transações\n0 - Sair\nDigite o número da opção desejada: `, (op) => {
            switch(op){
                case '1':
                    console.log(this.blockchain.toString());
                    break;
                case '5':
                    this.addresses.set(helper.genAddress());
                    break;
                case '6':
                    console.log(this.addresses.keys());
                    break;
                case '0':
                    console.log(`Saindo do nó ${this.id}`);
                    rl.close();
                    return;
                default:
                    console.log('Opção inválida. Por favor, escolha uma opção válida.');
            }
            this.menu(rl);
        });
    }
}

module.exports = Node;