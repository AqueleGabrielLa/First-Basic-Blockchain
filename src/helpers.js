const crypto = require("crypto");
const Transacao = require("./transacao");

class Helpers{
    static genAddress(){
        const address = crypto.randomBytes(15).toString("hex");
    
        console.log(`Endereço criado: ${address}`);
        
        return address;
    }

    static listAddress(addresses){
        console.log(`Endereços registrados na rede: `);
        console.log(addresses);
        
        return addresses;
    }

    static questionA(query, rl) {
        return new Promise((resolve) => rl.question(query, resolve));
    }

    static isValidAddress(address){
        if(this.isHex(address) == true && address.length == 30) return true;

        return false;
    }

    static isHex(h) {
        return /^[0-9a-fA-F]+$/.test(h);
    }
}

module.exports = Helpers;