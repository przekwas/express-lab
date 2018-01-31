import { format } from "url";

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
    fs.appendFile("./server/url_log.txt", `Logged URL: ${req.url}\n`, (error) => { console.log(error) });
    next();
});

app.post('/tourny-form', (req, res, next) => {

    let rawdata = fs.readFileSync("./server/tournament_log.json");
    let data = JSON.parse(rawdata);

    let content = {};
    content['name'] = req.body.name;
    content['character'] = req.body.character;

    let dataArray = data;
    dataArray.push(content);

    fs.writeFile("./server/tournament_log.json", JSON.stringify(dataArray), (error) => { console.log(error) });

    res.redirect('/');

    next();
})

app.get('/formsubmissions', (req, res, next) => {
    fs.readFile(path.join(__dirname, './tournament_log.json'), {
        encoding: "UTF-8"
    }, (err, data) => {

        let formatted = JSON.parse(data);
        formatted.array.forEach(element => {
            
        });
        res.send(formatted);
    })
})

//servers files from /public directory
app.use(express.static(path.join(__dirname, '../public')));


//server listening on port 3000
app.listen(3000);