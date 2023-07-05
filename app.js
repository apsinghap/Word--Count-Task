var http = require('http');
const express = require("express");
const route = require("./route/route")
const app = express();
const bodyParser= require("body-parser")
const cors =require("cors")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/test",route)

const server=http.createServer (app)
server.listen(3000);