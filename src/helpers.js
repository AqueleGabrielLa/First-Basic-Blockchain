const crypto = require("crypto");

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
}

module.exports = Helpers;