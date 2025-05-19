const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");

const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3crt5al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


const coffeeCollection = client.db('coffeesDB').collection('coffees');

    app.get('/coffees' ,  async(req , res) =>{
      const cursor = coffeeCollection.find();
      const result = await  cursor.toArray();
      res.send(result)
    })

    app.post('/coffees' , async(req,res)=>{
      const newCoffee = req.body;
      console.log(newCoffee)
      const result = await coffeeCollection.insertOne(newCoffee)
      res.send(result)
    })











    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

 





app.get("/", (req, res) => {
  res.send("coffee server is being ready");
});

app.listen(port, () => {
  console.log("coffee server running on : ", port);
});
