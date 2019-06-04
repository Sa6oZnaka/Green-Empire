let express = require('express'),
    app = express();

let mysql = require('mysql');

app.use(express.static('public'));

app.listen(3010,()=>console.log('NodeJS express server started at port 3010'));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
