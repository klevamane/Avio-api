const express = require('express')
const products = require("./data/products");
const cors = require("cors");
const dotenv = require('dotenv')


dotenv.config()

const app = express()

// app.use(express)

const corOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  
// configure third party middleware
app.use(cors(corOptions));

app.use(express.urlencoded({extended: true,}));
app.use(express.json());



app.get("/", (req, res) => {
    res.send("API is currently running");
})

app.get("/api/products", (req, res) => {
    res.json({products: products})
})

app.get("/api/products/:id", (req, res) => {
    const product = products.find((product) => product._id == req.params.id)
    console.log("product is: ", product)
    res.json(product)
})

const port = process.env.PORT || 5000

app.listen(port, console.log(`The Server is running in ${process.env.NODE_ENV} mode on port ${port}`))