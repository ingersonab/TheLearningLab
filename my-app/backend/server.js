const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Login"
})

app.post('/signup', (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO login (`name`,`email`, `password`, `userType`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.userType
        
    ];
    db.query(sql, values, (err, data) =>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data) =>{
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }else{
            return res.json("Failed");
        }
    })
})
app.listen(8081, ()=>{
    console.log("listening");
})