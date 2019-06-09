let express = require('express'),
    app = express();

let bodyParser = require('body-parser');
let mysql = require('mysql');
let config = require('./config.js');

let con = mysql.createConnection(config);
con.connect(function(err) {
    if (err) {
        console.log("\x1b[31m");
        throw err;
    }
    console.log("\x1b[32mConnected to MySQL!\x1b[0m");
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/updateField',function(req,res){

    let temp = JSON.parse(req.body.data);

    let sql = `Update Field SET
        name = ?,
        startTime = ?,
        time = ?
    WHERE Field.x = ? AND Field.y = ? AND Field.gardenId = ?;`

    let data = [
        temp.name,
        temp.startTime,
        temp.time,
        req.body.x,
        req.body.y,
        req.body.userId
    ];

    console.log("DATA BELOW!!!!");
    console.log(data);

    update(sql, data);
});

app.get('/serverTime',function(req,res){

    response = {
        server_time : Date.now()
    };

    console.log(response);
    res.send( JSON.stringify(response) );
});

app.get('/getGarden',function(req,res){

    sql = `Select Field.x, Field.y, Field.name, Field.startTime, Field.time from Field where Field.gardenId = 1;`
    // TODO get garden ID

    con.query(sql , (error, results, fields) => {
        if (error) {
            return console.error("\x1b[33m" + error.message + "\x1b[0m");
        }

        console.log("\x1b[34mSending garden\x1b[0m");
        res.send( JSON.stringify(results) );
    });


});

function update(sql, data) {
    con.query(sql, data, (error, results, fields) => {
        if (error) {
            console.log("\x1b[33m");
            return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
    });
}

app.listen(3010,()=>console.log('\x1b[32mNodeJS express server started at port 3010\x1b[0m'));