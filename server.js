const express = require("express");
const cors = require("cors")
const { v4:uuidv4, v4 } = require('uuid');

/*

Api em tempo de memória, se reiniciar a api os dados serão perdidos ;-;

O objetivo é fornecer uma interface para um frontend simples que vai cadastrar, obter e remover as transações.

Falando em transação a lógica é ter um dashboard de transações, 
onde são cadastradas todas as entradas e saídas e mantém o registros das tansações.

poderia adicionar outras funcionalidades como o total em caixa ou em debito, adicionar filtros específicos, etc.,
idéias futuras...

*/

//servidor express simples
const app = express();


//requerimentos para o sevidor conseguir aceitar json e requisições do front
app.use(express.json());
app.use(cors())


//nossa base de dados em memória, com alguns registros default. ps: em vez de adicionar os registros aqui poderia colocar em um mongo da vida.
const transactions = [
  {
    id:uuidv4(),
    name: "Supermercado",
    amount: 350,
    type: "expenses",
    date: "2022-07-26",
    createdAt: Date(),
  },
  {
    id:uuidv4(),
    name: "Salário",
    amount: 2000,
    type: "income",
    date: "2022-07-26",
    createdAt: Date(),
  }
];


//só pra ver se a api está rodando
app.get('/', (req, res)=> res.json("app running"));


//retorna as transações cadastradas. 
app.get('/transactions', (req, res) => {
  res.status(200).json(transactions);
})

//cria um novo registro com as informações passadas pelo front
app.post('/transaction', (req, res) => {
  const {name, amount, date, type} = req.body;

  transactions.push({
    id: uuidv4(),
    name,
    amount,
    type,
    date,
    createdAt: Date()

  });

  return res.status(201).json(transactions);
})

//Deleta uma transação
app.delete('/transaction/:id', (req, res) => {
  const { id } = req.params; 

  const transaction = transactions.find(transaction => transaction.id === id); //Busca por uma transação através do id

  if(!transaction){
    return res.status(404).send('not found')
  }

  //pega o index da transação encontrada
  const index = transactions.indexOf(transaction);

  //se a transação for encontrada na memoria faz a exclusão com o método splice
  if(index > -1){
    transactions.splice(index, 1);
  }

  return res.status(201).json(transactions);
})


//sobe o servidor na porta 4000
app.listen(4000, console.log('app running on port 4000'));