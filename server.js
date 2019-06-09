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

    console.log(req.body);

    let temp = JSON.parse(req.body.data);
    console.log(temp);

    console.log(temp.name);

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


/*let sql = `UPDATE Users
           SET name = ?
           WHERE Id = ?`;

//let data = ["Koce", 1];

 */
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