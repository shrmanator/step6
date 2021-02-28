const express = require('express');
const app = express() // node.js server connection to browser stuff.
const dbcon = require('mysql');
const port = "4167"
const pool = dbcon.createPool({

    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_shermado',
    password        : 'Dovisthecoolest1',
    database        : 'cs340_shermado'
}); module.exports.pool = pool;  // pool.* will be all your server interfacing with the databse

let getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};


app.listen(port, function(err) {
    if (err) {console.log("error")}
});


