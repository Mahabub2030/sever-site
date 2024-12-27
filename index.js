const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

// MIDDLOWER
app.use(cors());
app.use(express.json());
// nLWCGJ5CCQhajMlg
// Library

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-cgkxfia-shard-00-00.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-01.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-02.x9t7sgg.mongodb.net:27017/?ssl=true&replicaSet=atlas-nszs70-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

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

    // custome start here
    const db = client.db('book-db')
    const booksCollection = db.collection('book')

    // save data in db
    app.post('/add-book', async (req, res) => {
      const bookData = req.body
      const result = await booksCollection.insertOne(bookData)
      console.log(result)
      res.send(result)
    })

    // get all data from db
    app.get('/books', async (req, res) => {
      const result = await booksCollection.find().toArray()
      res.send(result)
    })
    // custome end here

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// mongocode ends here

app.get("/", (req, res) => {
  res.send("assingmet  reuning on port");
});
app.listen(port, () => {
  console.log(`Sever in runing on Port :${port}`);
});
