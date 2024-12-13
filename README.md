# _Basic Blockchain_ ⛓️
Este repositório tem como objetivo armazenar a criação de uma _Blockchain_ básica, desenvolvida em _Node.js_. O projeto faz parte de uma sequencia de desafios propostos no programa _Scholarship_ da _Compass UOL_.

---

## Pré-requisitos ⤵️

É necessário haver o Node.js instalado em sua máquina, para isso, faça o _download_ aqui:

[_Node.js_](https://nodejs.org/en/download/package-manager) ❗

---

## Requisitos 🧰
Para poder executar o código, primeiramente é necessário clonar o repositório remoto para sua máquina. Para isso, execute o comando:

`git clone https://github.com/AqueleGabrielLa/First-Basic-Blockchain.git`

Após a clonagem, abra a pasta que clonou em um terminal e execute:

`npm install`

O npm fará o _download_ de algumas bibliotecas necessárias para o funcionamento do projeto, como a _crypto.js_, que lida com criptografia dos blocos da _Blockchain_.

---

## Executar o código ⚙️
Para executar o projeto, basta executar no terminal o seguinte comando:

`node index.js`

---

## Principais funcionalidades 🔧

O projeto contém funcionalidades básicas de uma rede _Blockchain_, são eles:

- Criação de nós na rede
  - Os nós estão interligados, cada um com sua cópia da _Blockchain_;
- Possibilidade de propagar e atualizar a _Blockchain_ do nó selecionado;
- Criação de transações, indexando-as a uma fila de transações ainda não processadas
  - Todos os endereços possuem um saldo;
- Criação de blocos a partir do _Proo-of-Work_, minerando e trazendo recompensa a um endereço do nó selecionado
  - Algoritmo de _Proof-of-Work_ (PoW) com mecanismo de dificuldade;
- Verificação de histórico de transações.

## Documentação detalhada 📄

Se ficou curioso, está disponivel uma documentação sobre o projeto, relatando como foi implementada cada funcionalidade, [aqui](/READ_DOCUMENTATION.md) ⬅️

## Finalização 🤔
Se tudo ocorreu bem, deve ser executado o código e apresentar um menu com todas as funcionalidades descritas acima.

Com esse projeto, pude ter meu primeiro contato com o _JavaScript_, no _Node.JS_ e fui capaz de colocar em prática os conceitos iniciais vistos durante a [trilha de aprendizado do Estágio](https://github.com/AqueleGabrielLa/revisao-estagio-compass).

---

## Analise o código 🧐

[Ir ao código](./src/) 📍