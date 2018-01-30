//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');

//creating the express server
let app = express();

app.use(bodyParser.urlencoded({ extended: false }))

//root get requests and sends a response 
// app.get('/', (req, res) => {
//     console.log("Hello from the web server side...");
// });

//middleware to console log every req.url AND to log it into a txt file in server directory
app.use((req, res, next) => {
    console.log(req.url);
    fs.appendFile("./server/url_log.txt", `Logged URL: ${req.url}\n`, (error) => {console.log(error)});
    next();
});

//servers files from /public directory
app.use(express.static(path.join(__dirname, '../public')));


//server listening on port 3000
app.listen(3000);