const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret', //a secret key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    } //set session cookie properties
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Login"
})

app.get('/teacherhome', (req, res)=>{
    if(req.session.name){
        return res.json({valid: true, name: req.session.name})
    }else{
        return res.json({valid: false})
    }
})

app.get('/studenthome', (req, res)=>{
    if(req.session.name){
        return res.json({valid: true, name: req.session.name})
    }else{
        return res.json({valid: false})
    }
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

const bcrypt = require('bcryptjs');

app.post('/login', (req, res) => {
    const sql = "SELECT name, email, password, userType FROM login WHERE `email` = ?";
    console.log("Starting query");
    db.query(sql, [req.body.email], (err, data) =>{
        console.log("Inside query function");
        if(err){
            console.error("Database error: ", err);
            return res.json("Error");
        }
        console.log("no database error");

        console.log("Data from DB: ", data);

        if(data.length === 0){
            return res.json("Invalid Email or Password");
        }

        const {name, email, pasword, userType} = data[0];

        console.log("Hashing password");
        const hashedPassword = data[0].password;

        console.log("Hashed password from database:", hashedPassword);
        console.log("Password sent in request:", req.body.password);

        console.log("Before bcrypt.compare");

        bcrypt.compare(req.body.password[0], hashedPassword, (bcryptError, result) => {
            console.log("Inside bcrypt.compare");
            if(bcryptError){
                console.error("bcrypt error: ", bcryptError);
                return res.json("Internal Server Error");
            }

            console.log("bcrypt compare result:", result);

            if(result){
                req.session.name = data[0].name;
                console.log(req.session.name);
                return res.json({ status: "Success", username: req.session.name, userType });
            }else{
                return res.json({ error: "Incorrect Password" });
            }
        })

        console.log(req.body);

        console.log("After bcrypt.compare");
    })
})
app.listen(8081, ()=>{
    console.log("listening");
})