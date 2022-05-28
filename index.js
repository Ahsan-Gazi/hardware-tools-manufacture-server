const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
 //const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;



app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.snip6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        await client.connect();
        const toolsmanufacture = client.db('tools-manufacture').collection('tools');
        const usersmanufacture = client.db('tools-manufacture').collection('users');
        const ordersmanufacture = client.db('tools-manufacture').collection('orders');
        console.log('toolsmanufacture');

      
        app.get('/tools', async (req, res) => {
          const tools = await toolsmanufacture.find().toArray();
          res.send(tools);
        });

        app.get('/user', async (req, res) => {
          const users = await usersmanufacture.find().toArray();
          res.send(users);
        });

        app.get('/orders', async (req, res) => {
          const orders = await ordersmanufacture.find().toArray();
          res.send(orders);
        });

    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hardware tools manufacture!');
  });
  
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });