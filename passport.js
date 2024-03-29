var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./config');
var connection = mysql.createConnection(dbconfig);

connection.query('USE ' + dbconfig.database);

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM Users WHERE id = ? ", [id],
            function (err, rows) {
                done(err, rows[0]);
            });
    });

    passport.use(
        'local-register',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                connection.query("SELECT * FROM Users WHERE username = ? ", [username], function (err, rows) {
                        if (err)
                            return done(err);
                        if (rows.length) {
                            return done(null, false, req.flash('registerMessage', 'That is already taken'));
                        } else {
                            let newUserMysql = {
                                username: username,
                                password: bcrypt.hashSync(password, null, null)
                            };

                            let insertQuery = "INSERT INTO Users (username, password, score) values (?, ?, 0)";

                            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
                                    console.log(err);
                                    console.log("ID: " + rows.insertId + " REGISTERED!");
                                    newUserMysql.id = rows.insertId;

                                    for (let y = 0; y < 12; y++) {
                                        for (let x = 0; x < 20; x++) {
                                            let sql = `Insert into Field (userId, x, y, name, startTime, time) values (?, ?, ?, 'empty', 1000, 10);`;

                                            connection.query(sql, [newUserMysql.id, x, y], function(err, rows, fields) {
                                                if (err) throw err;
                                            });

                                        }
                                    }

                                    return done(null, newUserMysql);
                            });
                        }
                });

            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                connection.query("SELECT * FROM Users WHERE username = ? ", [username],
                    function (err, rows) {
                        if (err)
                            return done(err);

                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'No User Found'));
                        }
                        if (!bcrypt.compareSync(password, rows[0].password))
                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));

                        return done(null, rows[0]);
                    });
            })
    );
};