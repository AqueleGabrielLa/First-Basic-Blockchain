const Blockchain = require("./blockchain");
const EventEmitter = require('events');
const helper = require('./helpers');

class Node extends EventEmitter{

    blockchain;
    static id = 0;
    static connectedNodes = [];

    constructor(){
        super();
        this.blockchain = new Blockchain();
        this.id = ++this.constructor.id;

        this.on("syncNeeded", () => {
            console.log("Sincronizando sua blockchain");
            this.updateChain();
        })
    }

    recieveChain(chain){
        console.log(`Nó com id ${this.id} recebeu uma nova blockchain. Validando a cadeia...`);
        
        if(chain.length > this.blockchain){
            this.blockchain = chain;
            console.log(`Blockchain atualizada. Cadeia mais longa adotada`);
            this.emit("chainUpdated", chain);
            this.propagateChain();
        } else {
            console.log(`Nó com o id ${this.id} tem uma blockchain mais longa`);
            this.emit("syncNeeded");
        }
    }

    connectNode(newNode){
        this.connectedNodes.push(newNode);
        console.log(`Nó com o id ${newNode.id} agora está conectado ao nó de id ${this.id}`);
        newNode.on("chainUpdated", (updatedChain) => this.recieveChain(updatedChain));
    }

    propagateChain(){
        for(let node of Node.connectedNodes){
            node.recieveChain(this.blockchain);
        }
    }

    updateChain(){
        let longestChain = this.blockchain;

        for(let node of Node.connectedNodes){
            if(node.blockchain.chain.length > longestChain.chain.length){
                console.log("AAAAAAAAA");
                console.log(node.blockchain.chain.length);
                console.log(longestChain.chain.length);
                
                
                
                longestChain = node.blockchain;
            }
        }

        if(longestChain !== this.blockchain){
            this.blockchain = longestChain;
            console.log(`Nó id ${this.id} agora tem a blockchain mais longa`);
        } else console.log(`Nó id ${this.id} já possui a blockchain mais longa`);
    }

    menu(rl, exit){
        rl.question(`\n1 - Visualizar blockchain\n2 - Atualizar blockchain\n3 - Progragar blockchain\n4 - Criar transação\n5 - Criar endereço\n6 - Ver seus endereços\n7 - Minerar bloco\n8 - Verificar histórico de transações\n0 - Sair\nDigite o número da opção desejada: `, (op) => {
            switch(op){
                case '1':
                    console.log(this.blockchain.toString());
                    break;
                case '2':
                    this.updateChain();
                    console.log(`Blockchain atualizada registrada`);
                    break;
                case '3':
                    this.propagateChain();
                    break;
                case '4':
                    const criarTransacao = async () => {
                        try {
                            const from = await helper.questionA(`Digite o endereço que enviará tokens: `, rl);
                            const to = await helper.questionA(`Digite o endereço que receberá tokens: `, rl);
                            const value = await helper.questionA(`Digite a quantidade de tokens a ser transferida: `, rl);
                    
                            this.blockchain.createTransaction(from, to, value);
                        } catch (error) {
                            console.error(`Erro ao criar transação:`, error);
                        } finally {
                            this.menu(rl, exit);
                        }
                    };
                    criarTransacao();
                    break;
                case '5':
                    this.blockchain.addresses.set(helper.genAddress(), 100);
                    break;
                case '6':
                    console.log(`Seus endereços: `);
                    console.log([...this.blockchain.addresses.keys()]);
                    break;
                case '7':
                    this.blockchain.createBlock();
                    break;
                case '8':
                    rl.question(`Digite o endereço que deseja verificar o histórico: `, (address) => {
                        if(helper.isValidAddress(address)) {
                            const result = this.blockchain.isInChain(address, this.blockchain.chain);
                            if(!result){
                                console.error(`Endereço não disponivel na rede`);
                            } else {
                                console.log(`Histórico do endereço selecionado: `);
                                this.blockchain.chain.forEach(element => {
                                    this.blockchain.getHistoryTransaction(element.transactions, address);
                                });
                            }
                        } else console.error("Endereço inválido!");
                    });
                    break;
                case '0':
                    console.log(`Saindo do nó ${this.id}`);
                    if(exit) exit();
                    return;
                default:
                    console.log('Opção inválida. Por favor, escolha uma opção válida.');
            }

            this.menu(rl, exit);
        });
        
    }
}

module.exports = Node;