var mysql = require('mysql');
const Hapi = require('hapi');

const server = new Hapi.Server({ port: 3000, host: 'localhost' });

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Digital@123',
    database: 'leadmangement'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... " + err);
    }
});

module.exports = connection;
