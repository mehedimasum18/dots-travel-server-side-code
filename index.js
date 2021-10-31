const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vukhj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true,
});


console.log(uri);

async function run() {
    
    try {
        await client.connect();
      // console.log("database connected");
      const database = client.db("dots_travel");
      const userCollection=database.collection("users")
      const visitCollection=database.collection("most_visit")
      
      // // This is get api part 
      
      app.get('/users', async (req, res) => {
        const cursor = userCollection.find({})
        const users = await cursor.toArray();
        res.send(users);
      });
      
      app.get('/most_visit', async (req, res) => {
        const cursor = visitCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
      });
      
      // // This is post api part 
      
      // app.post('/users', async (req, res) => {
      //   const newUser = req.body;
      //   const result = await usersCollection.insertOne(newUser);
      //   res.json(result);
      // });
      
      
      // //This is update api part 
      
      // app.put("/users/:id", async (req, res) => {
        
      //   const id = req.params.id;
      //   const updateUser = req.body;
      //   const filter = { _id: ObjectId(id) };
      //   const options = { upsert: true };
      //   const updateDoc={
      //     $set: {
      //       name: updateUser.name,
      //       email: updateUser.email,
      //       phone: updateUser.phone,
      //       address: updateUser.address
            
      //     }
      //   }
      //   const result = await usersCollection.updateOne(filter, updateDoc, options)
      //   res.json(result)
        
      // })
      
      // // This is delete api 
      
      // app.delete('/users/:id', async (req, res) => {
      //   const id = req.params.id;
      //   const query ={_id: ObjectId(id)}
      //   const result = await usersCollection.deleteOne(query);
      //   res.json(result)
      // })
      
    }
    finally {
        // await client.close();
    }
    
}

run().catch(console.dir)




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

