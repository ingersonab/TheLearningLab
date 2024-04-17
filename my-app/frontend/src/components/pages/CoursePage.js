import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CardItem from '../CardItem';
import '../../App.css';
import '../Cards.css';
import { accordionSummaryClasses } from "@mui/material";

function CoursePage(){
    const params = useParams();
    const [name, setName] = useState('');
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const {courseId} = params;
    const [course, setCourse] = useState(null);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    axios.defaults.withCredentials = true;
    useEffect(()=> {
        axios.get('http://localhost:8081/coursehome')
        .then(res => {
        if(res.data.valid){
            setName(res.data.name);
            const userId = sessionStorage.getItem('userId');
            console.log("User ID course home frontend : ", userId);
            if(userId){
                axios.get(`http://localhost:8081/userCourses/${userId}`)
                .then(res => {
                    setCourses(res.data.courses);
                    console.log("Courses: ", res.data.courses);
                })
                .catch(err => console.log(err));
            }
        }else{
            navigate('/login')
        }
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8081/course/${courseId}`)
        .then(res => {
            console.log("Course data: ", res.data);
            setCourse(res.data.course);
        })
        .catch(err => console.log(err));
    }, [courseId]); 
        
    const handleSubmit = (event) => {
        event.preventDefault();
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailFormat.test(email)) {
            setErrorMessage("Invalid email format");
            return;
        }

        axios.get(`http://localhost:8081/studentExists/${email}`)
        .then((res) => {
            if(res.data.exists) {
                axios.post(`http://localhost:8081/addStudent/${courseId}`, {email: email})
                .then((res) => {
                    console.log("Student added to course");
                    setEmail("");
                    setErrorMessage("");
                })
                .catch((err) => {
                    console.error("Error adding student: ", err)
                });
            }else {
                setErrorMessage("Student not found");
            }
        })
        .catch((err) => console.error("Error searching for student:", err));
    }

    if (!course) {
        return <div>Loading...</div>;
      }

    return (
    <div className="course-page-container">
        <div className="course-header-container">
        <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={100} width={100} />
            <h1 style={{textAlign: 'left'}}>{course.courseName}</h1>
            <h3>Course Description:</h3>
            <p>{course.courseDescription}</p>
            <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
        </div>
        <div className="student-entry-container ">
        <div className='mb-3'>                    
                <h4>Add student to Course</h4>                    
                <input type="email" placeholder='Enter Student Email' name='email' style={{maxWidth: '100%', float: 'right'}} className='rounded-0'/>                    
                <br/>
                {errorMessage && <span className='text-danger'> {errorMessage}</span>}
                <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <button type='submit' className='btn bg-primary w-100 rounded-0' onClick={handleSubmit}> Add Student</button>
            </div>
        </div>
    </div>
    )
}

export default CoursePage;