let express = require('express'),
    app = express();

let mysql = require('mysql');
let config = require('./config.js');

app.use(express.static('public'));

app.listen(3010,()=>console.log('NodeJS express server started at port 3010'));

let con = mysql.createConnection(config);


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});


