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

app.get('/coursehome', (req, res)=>{
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
        });
    } catch(error){
        console.error("Error processing signup: ", error);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

const bcrypt = require('bcryptjs');

app.post('/login', (req, res) => {
    const sql = "SELECT id, name, email, password, userType FROM login WHERE `email` = ?";
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

            console.log(data[0].userType);
            
            if(result){
                req.session.userId = data[0].id;
                req.session.name = data[0].name;
                console.log(req.session.name);
                console.log(req.session.userId);
                return res.json({ status: "Success", userId: req.session.userId, username: req.session.name, userType: data[0].userType });
            }else{
                return res.json({ error: "Incorrect Password" });
            }
        })

        console.log(req.body);

        console.log("After bcrypt.compare");
    })
})

app.post('/createCourse', (req, res) => {
    const {name, description, userId} = req.body;
    const sql = "INSERT INTO course (courseName, courseDescription, teacher_id) VALUES (?, ?, ?)";

    db.query(sql, [name, description, userId], (err, data) => {
        if(err){
            console.error("Error creating course: ", err);
            return res.json({error: 'Database Error'});
        }

        console.log('Course created!');
        return res.json({message: 'Course created successfully!'});
    })
})

app.get('/usercourses/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT course_id, courseName, courseDescription from course WHERE teacher_id = ?";
    console.log("User ID when fetching courses:", userId);
    db.query(sql, [userId], (err, data) => {
        if(err){
            console.error("Error fetching course data: ", err);
            return res.json({error: 'Database Error'});
        }

        console.log("User courses retreived successfully");
        return res.json({courses: data});
    })
})

app.get('/course/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const sql = "SELECT courseName, courseDescription FROM course WHERE course_id = ?";

    db.query(sql, [courseId], (err, data) =>{
        if(err){
            console.error("Error fetching course data: ", err);
            return res.json({error: 'Database Error'});
        }

        if(data.length === 0){
            return res.json({error: 'Course does not exist'});
        }
        
        const course = data[0];
        return res.json({course: course});
    })
})

app.get('/studentExists/:email', (req, res) => {
    const email = req.params.email;
    const sql = "SELECT student_id, email FROM student WHERE email = ?";

    db.query(sql, [email], (err, data) =>{
        if(err){
            console.error("Error fetching student data: ", err);
            return res.json({error: 'Database Error'});
        }

        if(data.length === 0){
            return res.json({error: 'Student does not exist'});
        }

        const student = data[0];
        return res.json({student: student});

    })
})

app.post('/addStudent/:courseId', (req, res) => {

})

app.post('/logout', (req, res) => {
    req.session.destroy((err) =>{
        if(err){
            console.error('Session destroy unsuccessful: ', err)
            return res.json({error: 'Logout unsuccessful'});
        }
        res.clearCookie('connect.sid'); //clear user session cookie
        res.json({message: 'Logout successful'});
    })
})
app.listen(8081, ()=>{
    console.log("listening");
})