const Blockchain = require("./blockchain")
const EventEmitter = require('events');

class Node extends EventEmitter{

    blockchain;
    static id = 0;
    addresses = [];
    connectedNodes = [];

    constructor(){
        super();
        this.blockchain = new Blockchain();
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
        console.log(`Node with the id ${newNode.id} is now connected to this node`);
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
}

const node1 = new Node();

node1.on("syncNeeded", () => { node1.updateChain() });

module.exports = Node;