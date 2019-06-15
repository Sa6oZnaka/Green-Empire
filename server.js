let express = require('express');
let session = require('express-session');
let app = express();
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
    WHERE Field.x = ? AND Field.y = ? AND Field.userId = ?;`;

    let data = [
        temp.name,
        new Date().getTime(),
        temp.time,
        req.body.x,
        req.body.y,
        req.user.id
    ];

    update(sql, data);
});

app.get('/serverTime',function(req,res){

    response = {
        server_time : new Date().getTime()
    };

    res.send( JSON.stringify(response) );
});

app.get('/getGarden',function(req,res){

    sql = `Select Field.x, Field.y, Field.name, Field.startTime, Field.time from Field where Field.userId = ?;`;

    con.query(sql , [req.user.id], (error, results, fields) => {
        if (error) {
            return console.error("\x1b[33m" + error.message + "\x1b[0m");
        }
        console.log("\x1b[34mSending garden for " + req.user.id + "\x1b[0m");
        res.send( JSON.stringify(results) );
    });
});

function update(sql, data) {
    con.query(sql, data, (error, results, fields) => {
        if (error) {
            return console.error("\x1b[33m" + error.message + "\x1b[0m");
        }
        if(results.affectedRows !== 1) {
            console.log('\x1b[33mRows affected:', results.affectedRows + "\x1b[0m");
        }
    });
}

app.listen(3010,()=>console.log('\x1b[32mNodeJS express server started at port 3010\x1b[0m'));