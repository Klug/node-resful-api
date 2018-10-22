//URL:https://academind.com/learn/node-js/building-a-restful-api-with/
//Last video: MongoDB and Mongoose

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
//mongodb://node-rest-shop-admin:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-shard-00-00-suk4z.mongodb.net:27017,node-rest-shop-shard-00-01-suk4z.mongodb.net:27017,node-rest-shop-shard-00-02-suk4z.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true
mongoose.connect('mongodb://node-rest-shop-admin:Sdfghk!123@node-rest-shop-shard-00-00-suk4z.mongodb.net:27017,node-rest-shop-shard-00-01-suk4z.mongodb.net:27017,node-rest-shop-shard-00-02-suk4z.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',
    {
        // useMongoClient: true
        useNewUrlParser: true
    })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   if(req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
       return res.status(200).json({});
   }
   next();
});

// Routes which handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;