const express = require("express");
const cors = require('cors');
const sql = require('mysql');
const mysql = require('./dbcon');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname + '/css'));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const corsOptions = {
    origin: "http://flip3.engr.oregonstate.edu:4169",
    optionsSuccessStatus: 200
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('mysql', mysql);



app.get('/', function (req, res) {
    res.render('index', {});
});

// Insert new UserAcccount into db
app.post("/UserRegistration", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `INSERT INTO UserRegistrations (lastName, firstName, password, email, zipCode) VALUES (?, ?, ?, ?, ?)`;
    let render = [req.body.lastName, req.body.firstName, req.body.password, req.body.email, req.body.zipCode];
    mysql.pool.query(sql, inserts, function (error) {
        let msg = ""
        if (error) {
            let msg = "incorrect info"
        } else {
            let msg = ` ${req.body.firstName}, your email is ${req.body.email} and your account is ready to use.`;
        }
        res.render('UserSignUp', {});
    });
});

// Select a user from the UserAccounts table given email and password.
app.get("/UserLogin", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `SELECT userID, lastName, firstName, email FROM UserSignUps WHERE email = ? AND password = ?`;
    let data = [req.query.email, req.query.password];
    mysql.pool.query(sql, data, function (error, results, fields) {
        const queryResults = {};
        if (error || results[0] == null) {
            queryResults["successful"] = false;
        } else {
            queryResults["successful"] = true;
            queryResults["userID"] = results[0].userID;
            queryResults["firstName"] = results[0].firstName;
            queryResults["lastName"] = results[0].lastName;
            queryResults["email"] = results[0].email;
        }
        res.render('UserLogin', {data});
    });
});


// Insert new Location into UserLocationsHistory:
app.post("/UserRegistration", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `INSERT INTO UserLocationHistory VALUES (?, ?, ?)`;
    let inserts = [req.body.zipCode]
    mysql.pool.query(sql, inserts, function (error, results, fields) {
        let msg = ""
        if (error) {
            let msg = "incorrect info"
        } else {
            let msg = ` ${req.body.firstName}, your email is ${req.body.email} and your account is ready to use.`;
        }
        res.send({ msg });
    });
});

// Select specific user:
app.post("/getUser", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `SELECT UserAccounts.userID FROM UserAccounts WHERE UserAccounts.userID = ?`;
    let insert = [req.body.userID]
    mysql.pool.query(sql, insert, function (error, results, fields) {
        let queryResults = [];
        results.forEach((row) => {
            queryResults.push(row)
        })
        console.log(queryResults);
        res.send(queryResults);
    });
});


// Select all Guides in certain location:
app.post("/getGuides", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `SELECT UserAccounts.isGuide FROM UserAccounts WHERE UserAccounts.locationID = ?`;
    let insert = [req.body.userID]
    mysql.pool.query(sql, insert, function (error, results, fields) {
        let queryResults = [];
        results.forEach((row) => {
            queryResults.push(row)
        })
        console.log(queryResults);
        res.send(queryResults);
    });
});



// Delete a specific UserLocation:
app.post("/deleteUserLocation", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `DELETE FROM UserLocationHistory WHERE UserLocationHistory.locationID = ?`;
    let insert = [req.body.userID]
    mysql.pool.query(sql, insert, function (error, results, fields) {
        let queryResults = [];
        results.forEach((row) => {
            queryResults.push(row)
        })
        console.log(queryResults);
        res.send(queryResults);
    });
});


// Delete a specific UserAccount:
app.post("/deleteUserAccount", (req, res) => {
    let mysql = req.app.get('mysql');
    let sql = `DELETE FROM UserLogins WHERE UserLogins.lastName = ? AND UserLogins.firstName = ? AND UserLogins.password = ?`;
    let insert = [req.body.userID]
    mysql.pool.query(sql, insert, function (error, results, fields) {
        let queryResults = [];
        results.forEach((row) => {
            queryResults.push(row)
        })
        console.log(queryResults);
        res.send(queryResults);
    });
});

app.set('port', process.argv[2]);

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') 
    + '; press Ctrl-C to terminate.');}
     );

     