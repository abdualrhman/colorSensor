const express = require("express");
const util = require("util");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const color = readFile("./config.json", "utf8");
const app = express();

app.use(cors())
app.use(logger('dev'));
app.listen(3001, () => console.log("Example app listening on port 3000!"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse application/json
app.use(bodyParser.json());

app.post("/newColor", (req, res)=>{
   let body = req.body;
   writeFile("./config.json", JSON.stringify(body), "utf8")
   .then((data)=>{return res.send("done..")})
   .catch((err)=>{return re.send(err)})
});

app.get("/color", (req, res) =>{
    readFile("./config.json", "utf8")
    //.then((data)=>{console.log(JSON.parse(data))})
   .then((data)=>{return res.send(JSON.parse(data))})
   .catch((err)=> {return res.send(err)})
 });
