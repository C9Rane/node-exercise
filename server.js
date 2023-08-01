const express = require("express");
const server = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");
const PORT = 5555;

dotenv.config();

//setup the connection b/w database and server
//bridges doe server and DB
const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
});

//Middleware
server.use(express.json());

//Routes

server.get("/products", (req, res) => {
    connection.query(`SELECT * FROM products`, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500);
            res.end("Server Error: Error with DataBase");
        } 
        res.status(200);
        res.json(data);
    })
});

server.put("/products/:id", (req, res) => {
    const {id} = req.params;
    const updateData = req.body

    //use parameterized queries `? ... [updateData, etc]`
    connection.query(`UPDATE products SET Name = ? WHERE ProductID = ?;`, [updateData.Name, id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500);
            res.end("Server Error: Error with DataBase");
        } 
        res.status(200);
        res.json(data);
    })
})

server.post("/products/:id", (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        res.status(200);
        res.json(body);
        
    } catch (err){
        next(err);
    }
});

//custom Error Handler Middleware
server.use((err, req, res, next) => {
    if (err){
        console.error(err);
        res.status(500);
        res.end("Server Error");
    }
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});