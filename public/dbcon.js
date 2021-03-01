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
}); module.exports.pool = pool;  // pool.* will be all your server interfacing with the database

pool.query(`SELECT * from UserAccounts`, (err, result, fields)=>{
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

function getGuides(res, mysql, context, complete) {
    mysql.pool.query("SELECT userID, isGuide FROM UserAccounts", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end()
        }
        context.guides = results;
        complete();
    });
}

let getConnection = function(callback) {
    pool.getConnections(function(err, connection) {
        callback(err, connection);
    });
};

app.listen(port, function(err) {
    if (err) {console.log("error")}
});


