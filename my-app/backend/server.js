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

//initialize SQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Login"
})

//server endpoints for redirects
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

//server endpoint for inserting new user into DB
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

//server endpoint for logging in the user
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

//server endpoint for creating course 
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

app.get('/teachercourses/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT course_id, courseName, courseDescription from course WHERE teacher_id = ?";
    console.log("User ID when fetching courses:", userId);
    db.query(sql, [userId], (err, data) => {
        if(err){
            console.error("Error fetching course data: ", err);
            return res.json({error: 'Database Error'});
        }

        console.log("Teacher courses retreived successfully");
        return res.json({courses: data});
    })
})

//server endpoint for fetching courses that student is enrolled in
app.get('/studentcourses/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT crs_tkn.course_id, crs_tkn.student_id, crs.courseName FROM course_taken AS crs_tkn JOIN course AS crs ON crs_tkn.course_id = crs.course_id WHERE student_id = ?";
    console.log("User ID when fetching courses:", userId);
    db.query(sql, [userId], (err, data) => {
        if(err){
            console.error("Error fetching course data: ", err);
            return res.json({error: 'Database Error'});
        }

        console.log("Student courses retreived successfully");
        return res.json({courses: data});
    })
})

//server endpoint for displaying course information on course pages
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

//server endpoint for fetching student data for student enrollement table on course pages
app.get('/studentData/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const sql = "SELECT crs_tkn.course_id, crs_tkn.student_id, l.name, l.email FROM course_taken AS crs_tkn JOIN login AS l ON crs_tkn.student_id = l.id WHERE course_id = ?"

    db.query(sql, [courseId], (err, data) => {
        if(err){
            console.error("Error fetching student data: ", err);
            return res.json({error: 'Database Error'});
        }

        console.log("Student data retreived successfully");
        return res.json({students: data});
    })
})

//server endpoint for checking if a student exists before adding them to a course
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

//server endpoint for adding student to a course after teacher submits the form on their course page
app.post('/addStudent/:courseId', (req, res) => {
    const {courseId} = req.params;
    const {email, userId} = req.body;

    console.log("Course Id: ", courseId);

    if(!courseId){
        console.error('Course ID needed');
        return res.json({error: 'Course ID needed'});
    }

    if(!email){
        console.error('Email needed');
        return res.json({error: 'Email needed'})
    }

    if(!userId){
        console.error('User Id needed');
        return res.json({error: 'User Id needed'});
    }

    const verifyStudentSql = "SELECT student_id FROM student WHERE email = ?";
    db.query(verifyStudentSql, [email], (err, data) => {
            
        if(err){
            console.error("Error searching for student");
            return res.json({error: 'Database Error'});
        }

        if(data.length === 0){
             console.error('Student does not exist');
            return res.json({error: 'Student does not exist'});
        }

        const studentId = data[0].student_id;

        const sql = "INSERT INTO course_taken (course_id, teacher_id, student_id) VALUES (?, ?, ?)"
        db.query(sql, [courseId, userId, studentId], (err, result) => {
            if(err){
                if (err.code === 'ER_DUP_ENTRY') {
                    console.error('Duplicate course_taken record detected');
                    return res.status(400).json({ error: 'Student already enrolled in course' });
                } else {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Database Error' });
                }
            }

            console.log('Student added successfully!');
            return res.json({message: 'Student added successfully!'})
        })
    })
}) 

//server endpoint for retrieving the game Id for game within a course
app.get('/getGameId/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const sql = "SELECT game_id FROM game_course WHERE course_id = ?";

    db.query(sql, [courseId], (err, data) => {
        if(err){
            console.error("Error retrieving game ID: ", err);
            return res.json({error: 'Database Error'});
        }

        if(data.length === 0){
            return res.json({error: 'No game found'});
        }

        const gameId = data[0].game_id;
        return res.json({gameId: gameId});
    })
})

//server endpoint for adding the score generated within the unity game to a temporary table in the DB after game completion
app.post('/updateScore', (req, res) => {
    const {score} = req.body;

    console.log('Score from Unity:', score);

    const sql = "INSERT INTO temp (score) VALUES (?)";
    db.query(sql, [score], (err, result) => {
        if(err){
            console.error('Error adding score:', err);
            return res.json({error: 'DB Error'});
        }

        console.log('Score added successfully!');
        return res.json({message: 'Score received!'});
    })
})

//server endpoint for retrieving the score from the temporary table
app.get('/getScore', (req, res) => {
    const sql = "SELECT score FROM temp";
    
    db.query(sql, (err, data) => {
        if(err){
            console.error('Error retrieving score:', err);
            return res.json({error: 'DB Error'});
        }

        const score = data[0].score;
        console.log('retrieved score: ', score);
        return res.json({score: score});

    })
    
})

/*server endpoint for adding the student id, game id, and the score data to the game_student table after student completes the game and 
clicks the 'Exit' button on top of the game window. If the game record already exists for the student, the high score in the table will be
updated if the new score is higher than the existing score. After the data has been inserted/updated, the score is cleared from the temp table. */
app.post('/addGameData', (req, res) => {
    const {gameId, studentId, score} = req.body;

    const checkRecordSql = "SELECT * FROM game_student WHERE game_id = ? AND student_id = ?";
    db.query(checkRecordSql, [gameId, studentId], (checkError, checkResult) => {
        if(checkError){
            console.error('Error while checking record:', checkError);
            return res.json({error: 'DB Error'});
        }
        if(checkResult.length > 0){
            const tableScore = checkResult[0].score;
            if(score > tableScore){
                const updateSql = "UPDATE game_student SET score = ? WHERE game_id = ? AND student_id = ?";
                db.query(updateSql, [score, gameId, studentId], (updateError, updateResult) => {
                    if(updateError){
                        console.error('Error updating score: ', updateError);
                        return res.json({error: 'DB Error'})
                    }
                    console.log("Score updated!");
                    return res.json({ message: 'Score updated!' });
                })
            }else {
                console.log("Score is not higher, update not needed");
                return res.json({message: 'Score Received!'});
            }
        } else {
            const sql =  "INSERT INTO game_student (game_id, student_id, score) VALUES (?, ?, ?)";
            db.query(sql, [gameId, studentId, score], (err, result) => {
                if(err){
                console.error('Error adding game data:', err);
                return res.json({error: 'An unexpected error occurred'});
                }
                console.log('Game data added!');
                return res.json({message: 'Game data added'});
            })
        }
    })
    const clearTempSql = "DELETE FROM temp";
    db.query(clearTempSql, (clearError, clearResult) => {
        if(clearError){
            console.error('Error clearing temporary table: ', clearError);
        }
        console.log("Temp table cleared!");
    })
})

//server endpoint for generating scoreboards for courses that teacher that contain games 
app.get('/scoreboardlist/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT c.course_id, c.courseName, c.teacher_id, gc.game_id FROM course AS c JOIN game_course AS gc ON c.course_id = gc.course_id WHERE c.teacher_id = ?";

    db.query(sql, [userId], (err, data) => {
        if(err){
            console.error('Error pulling up courses: ', err);
            return res.json({error: 'DB Error'})
        }

        const courseId = data[0].course_id;
        return res.json({result: data, courseId: courseId});
    })
})

app.get('/getscoreboarddata/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const sql = "SELECT l.name, gs.student_id, gs.score FROM login AS l JOIN game_student AS gs ON l.id = gs.student_id JOIN game_course AS gc ON gs.game_id = gc.game_id WHERE gc.course_id = ? ORDER BY gs.score DESC"
    db.query(sql, [courseId], (err, data) => {
        if(err){
            console.error("Error fetching game data: ", err);
            return res.json({error: 'Database Error'});
        }

        console.log("Game data retreived successfully");
        return res.json({gameData: data});
    })
})

/*server endpoint for logging out the user. HTTP request sent when the user clicks 'LOG OUT' button on the navbar. Session is destroyed
and cookie is cleared*/
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