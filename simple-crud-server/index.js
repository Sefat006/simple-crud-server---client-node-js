const express = require('express')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.json())

/*
    sefatur76
    mVxXZQf9mr1NQSIy
*/

console.log(process.env.DB_USER,process.env.DB_PASS)
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://sefatur76:mVxXZQf9mr1NQSIy@cluster0.zkpltdq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db('usersDB').collection('users');

    // create api link for (/user)
    app.get('/users', async(req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const user = await userCollection.findOne(query);
      res.send(user);
    })

    app.post('/users', async(req, res) => {
      const user = req.body;
      console.log('new user', user);
      // insertOne for inserting data
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // to update Data
    app.put('/users/:id', async(req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(id, user);
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updatedUser = {
        // j information gula update korbo
        $set: {
          name: user.name,
          email : user.email
        }
      }

      const result = await userCollection.updateOne(filter, updatedUser, options);
      res.send(result);

    })

    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      console.log('please delete from database', id);
      const query = { _id : new ObjectId(id)}
      // deleteOne is for deleting data
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('SIMPLE Crud is running');
})

app.listen(port, ()=> {
    console.log(`simple crud running : ${port}`);
})