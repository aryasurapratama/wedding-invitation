const express = require('express')
const mysql = require('mysql')
const BodyParser = require ("body-parser");
const { query } = require('express');

const app = express();
app.use(BodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

// app.set("views", "views") tb_message
app.use(express.static(__dirname + '/views'));
const db = mysql.createConnection({
    host: "localhost",
    database: "tb_message",
    user: "root",
    password: "",
})

db.connect((err) =>{
    if (err) throw err
    console.log("db connected")
    

     // untuk get data 
     app.get("/content/", (req, res) => {
        const sql = "SELECT * FROM tb_message ORDER BY id DESC"
        db.query(sql, (err, result) =>{
            const data = JSON.parse(JSON.stringify(result))
            res.render("content", {data : data})
        })
    })

    // untuk insert data 
    app.post("message", (req, res) =>{
        const insertSql = `INSERT INTO tb_message (name, message) VALUES ('${req.body.name}', '${req.body.message}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/content#message");
        })
    })

    
})

app.listen(8000, () => {
    console.log("server ready...")
})

