const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const productRoute = require('./routes/productRoute.js');
bodyParser = require('body-parser');
app.use(express.json());

const uri = process.env.MONGOOSE_URI
mongoose.connect(uri)
.then(() => console.log("database connected"))
.catch((err) => console.log(err.message));


app.use(bodyParser.json());
app.use(cors());

// Routes Configuration
app.use('/api', productRoute);

// Setup for the server port number
const port = process.env.PORT || 8000   

app.listen(port, () => {
    console.log('Server Listening On Port : ' + port);
})