let express = require('express');
let session = require('express-session');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let mysql = require('mysql');
let config = require('./config.js');

let passport = require('passport');
let flash = require('connect-flash');
require('./passport')(passport);

let con = mysql.createConnection(config);
con.connect(function(err) {
    if (err) {
        console.log("\x1b[31m");
        throw err;
    }
    console.log("\x1b[32mConnected to MySQL!\x1b[0m");
});

app.set('views', __dirname + '/views');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static('public'));
require('./route')(app, passport);

app.post('/updateField',function(req,res){

    let temp = JSON.parse(req.body.data);

    let sql = `Update Field SET
        name = ?,
        startTime = ?,
        time = ?
    WHERE Field.x = ? AND Field.y = ? AND Field.gardenId = ?;`;

    let data = [
        temp.name,
        Date.now(),
        temp.time,
        req.body.x,
        req.body.y,
        req.body.userId
    ];

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

    sql = `Select Field.x, Field.y, Field.name, Field.startTime, Field.time from Field where Field.gardenId = 1;`;
    // TODO get garden ID

    con.query(sql , (error, results, fields) => {
        if (error) {
            return console.error("\x1b[33m" + error.message + "\x1b[0m");
        }

        console.log("\x1b[34mSending garden\x1b[0m");
        res.send( JSON.stringify(results) );
    });
});


function createGarden(){
    for(let y = 0; y < 12; y ++){
        for(let x = 0; x < 20; x ++){
            sql = `Insert into Field (gardenId, x, y, name, startTime, time) values (?, ?, ?, 'empty', 1000, 10);`;
            data = [1, x, y];

            update(sql, data);
        }
    }
}
//createGarden();

function update(sql, data) {
    con.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error("\x1b[33m" + error.message + "\x1b[0m");
        }
        console.log('Rows affected:', results.affectedRows);
    });
}

app.listen(3010,()=>console.log('\x1b[32mNodeJS express server started at port 3010\x1b[0m'));