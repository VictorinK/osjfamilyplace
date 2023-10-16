const express = require('express') 
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mail = require("./email.js");
const mongoSecret = process.env['MONGO_URI']
const stripeSecret = process.env['STRIPE_KEY']
const authEmail = process.env['AUTH_EMAIL']
const stripe = require('stripe')(stripeSecret);


const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoSecret, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const database = client.db("OSJFAMILYPLACE");
const residents = database.collection("resident");



app.use(express.json());
app.use(express.static("public"));

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
   res.send('Hello World');
});


// POST method to retrieve param first name, last name, email, date. phone number  
// For the future add more params and then validate on the client end
app.post('/submit-email', urlencodedParser, function (req, res) {
   
   response = {
      name: req.body.name,
      
      email: req.body.email,
      
      msg: req.body.msg
   };
    
   console.log(response);
   mail.sendMail(authEmail, response.name, response.msg);
  
   res.redirect('back')
})

app.listen(process.env.PORT || 3000, function () {
  console.log("app listening ");
})

async function pingDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
pingDb().catch(console.dir);


async function listCustomer() {
  try {
  //connect to the stripe Api to retrieve customer list 
  const customerList = await stripe.customers.list()
  console.log(customerList) 
    
      
    } catch {
    console.log("Error retrieving customer list");
    
    }
}  

listCustomer().catch(console.dir);