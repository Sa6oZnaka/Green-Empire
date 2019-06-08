let express = require('express'),
    app = express();

let bodyParser = require('body-parser');
let mysql = require('mysql');
let config = require('./config.js');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/updateField',function(req,res){

    console.log(req.body);

    let temp = JSON.parse(req.body.data);
    console.log(temp);

    console.log(temp.name);

});

app.get('/serverTime',function(req,res){

    response = {
        server_time : Date.now()
    };

    console.log(response);
    res.send( JSON.stringify(response) );
});


/*
let con = mysql.createConnection(config);

let sql = `UPDATE User
           SET Garden = ?
           WHERE Id = ?`;

let data = ["[ZDR KOCE]", 1];


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

con.query(sql, data, (error, results, fields) => {
    if (error){
        return console.error(error.message);
    }
    console.log('Rows affected:', results.affectedRows);
});
*/

app.listen(3010,()=>console.log('NodeJS express server started at port 3010'));