const express = require('express');
const startserver = require('./db/mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const { sendmailtoUser, sendmailtoUserCorn } = require('./controller/sendmail');
dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {port ,uri}= process.env;
app.get('/',(req,res)=>{
    res.send("kml")
})

app.post('/sendmail',sendmailtoUser)
app.post('/sendmailcorn',sendmailtoUserCorn)
startserver(app,port,uri)