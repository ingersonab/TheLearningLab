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
    console.log("Received signup request:",req.body);
    const {name, email, password, userType} = req.body;
    const sql = "INSERT INTO login (`name`,`email`, `password`, `userType`) VALUES (?, ?, ?, ?)";
    const values = [name, email, password, userType];

    try{
        db.query(sql, values, (err, data) =>{
            if(err){
                if (err.code === 'ER_DUP_ENTRY') {
                    console.error('Duplicate Email detected');
                    return res.status(400).json({ error: 'Email already exists' });
                } else {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Database Error' });
                }
            }

            const loginId = data.insertId;

            if(userType === "teacher"){
                const teacherSql = "INSERT INTO teacher (`teacher_id`, `email`) VALUES (?, ?)";
                const teacherValues = [loginId, email];

                db.query(teacherSql, teacherValues, (teacherError, teacherData) =>{
                    if(teacherError){
                        return res.status(500).json({ error: "Error: ", teacherError });
                    }
                    return res.json({ message: "Teacher account created"});
                })
            } else if (userType === "student"){
                const studentSql = "INSERT INTO student (`student_id`, `email`) VALUES (?, ?)";
                const studentValues = [loginId, email];

                db.query(studentSql, studentValues, (studentError, studentData) =>{
                    if(studentError){
                        return res.status(500).json({ error: "Error: ", studentError });
                    }                 
                    return res.json({ message: "Student account created"});
                })
            }else{
            return  res.status(400).json({error: "Invalid user type"});
            }
            return res.json({ message: "Account created successfully" });
        });
    } catch(error){
        console.error("Error processing signup: ", error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data) =>{
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            const userType = data[0].userType;
            return res.json({ status: "Success", userType: userType});
        }else{
            return res.json("Failed");
        }
    })
})
app.listen(8081, ()=>{
    console.log("listening");
})