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

<<<<<<< HEAD
=======
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

>>>>>>> 0ade028 (added new file 'users.js' which will get the info from the db. it still need to be populated.)
let getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

<<<<<<< HEAD

=======
>>>>>>> 0ade028 (added new file 'users.js' which will get the info from the db. it still need to be populated.)
app.listen(port, function(err) {
    if (err) {console.log("error")}
});


