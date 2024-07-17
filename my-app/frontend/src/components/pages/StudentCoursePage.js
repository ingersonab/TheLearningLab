import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CardItem from '../CardItem';
import '../../App.css';
import '../Cards.css';
import { accordionSummaryClasses } from "@mui/material";
import Footer from '../Footer';

function StudentCoursePage(){
    const params = useParams();
    const [name, setName] = useState('');
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const {courseId} = params;
    const [course, setCourse] = useState(null);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [gameId, setGameId] = useState(null);

    const API_BASE_URL = 'http://LearningLabServer-dev.us-east-1.elasticbeanstalk.com';

    axios.defaults.withCredentials = true;
    useEffect(()=> {
        axios.get(`${API_BASE_URL}/coursehome`)
        .then(res => {
            if(res.data.valid){
                setName(res.data.name);
                const userId = sessionStorage.getItem('userId');
                console.log("User ID course home frontend : ", userId);
                if(userId){
                    axios.get(`${API_BASE_URL}/teacherCourses/${userId}`)
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
        axios.get(`${API_BASE_URL}/course/${courseId}`)
        .then(res => {
            console.log("Course data: ", res.data);
            setCourse(res.data.course);
        })
        .catch(err => console.log(err));

        axios.get(`${API_BASE_URL}/getGameId/${courseId}`)
        .then(res => {
            setGameId(res.data.gameId)
        })
        .catch(err => console.log(err));
    }, [courseId]); 

    useEffect(() => {
        axios.get(`${API_BASE_URL}/studentData/${courseId}`)
        .then(res => {
            console.log("Student data: ", res.data);
            setStudents(res.data.students);
        })
        .catch(err => console.log(err));
    }, [courseId])

    const getUpdatedStudentData = () => {
        axios.get(`${API_BASE_URL}/studentData/${courseId}`)
        .then(res => {
            console.log("Student data: ", res.data);
            setStudents(res.data.students);
        })
        .catch(err => console.log(err));
    }

    if (!course) {
        return <div>Loading...</div>;
      }

    return (
    <div className="course-page-container">
        <div className="course-header-container">
            <img src={require('../../logo.jpeg')} alt='logo image' height={100} width={100} />
            <h1 style={{textAlign: 'left'}}>{course.courseName}</h1>
            <h3>Course Description:</h3>
            <p>{course.courseDescription}</p>
            <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
        </div>
        <div className="content-container">
            <div className="left-container">
                <div className="table-container">
                    <h4>Student Enrollment:</h4>
                    <table style={{boxShadow: '10px 10px 5px'}}>
                        <tr>
                            <th>&nbsp;&nbsp;ID&nbsp;&nbsp;</th>
                            <th>&nbsp;&nbsp;Name&nbsp;&nbsp;</th>
                            <th>&nbsp;&nbsp;Email&nbsp;&nbsp;</th>
                        </tr>
                        {students.map((student, key) => {
                            return (
                                <tr key={key}>
                                    <td>&nbsp;&nbsp;{student.student_id}&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;{student.name}&nbsp;&nbsp;</td>
                                    <td>&nbsp;&nbsp;{student.email}&nbsp;&nbsp;</td>
                                </tr>
                            )
                        })}

                    </table>
                </div>
            </div>
            <div className="right-container">
                <h3>Games</h3>
                <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
                {courseId === '4' && (
                    
                    <div className='cards__container' style={{textAlign: 'center'}}>
                        <div className='cards__wrapper'>
                            <ul className='cards__items'>
                                <CardItem
                                    src={require('../../triviapic2.jpg')}
                                    text='Arithmetic Practice 1'
                                    path={`/triviagame/${gameId}`}
                                />
                                <CardItem
                                    src={require('../../cardGamePreview.jpg')}
                                    text='Arithmetic Practice 2'
                                    path= '/cardgame'
                                />
                            </ul>
                        </div>
                    </div>
                    
                    
                )}
            </div>
        </div>
        <Footer/>
    </div>
    )
}

export default StudentCoursePage;