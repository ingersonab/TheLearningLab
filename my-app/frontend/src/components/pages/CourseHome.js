import React, {useState, useEffect} from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import RandomColorCardItem from '../RandomColorCardItem';
import '../Cards.css';

export default function CourseHome() {

    const [name, setName] = useState('')
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()
    
    axios.defaults.withCredentials = true;
    useEffect(()=> {
        axios.get('http://localhost:8081/coursehome')
        .then(res => {
        if(res.data.valid){
            setName(res.data.name);
            const userId = sessionStorage.getItem('userId');
            console.log("User ID course home frontend: ", userId);
            if(userId){
                axios.get(`http://localhost:8081/userCourses/${userId}`)
                .then(res => {
                    setCourses(res.data.courses);
                })
                .catch(err => console.log(err));
            }
        }else{
            navigate('/login')
        }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='course_container'>
            <div className='cards'>
                <div className='header-container'>
                    <Link to="/courses" className='btn bg-primary w-100 rounded-0' style={{ position: 'absolute', top: 20, right: 20}}>Create Course</Link>
                    <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={100} width={100} />
                    <h2>{name}'s Courses</h2>
                    <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
                </div>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            {courses.map(course => (
                                <RandomColorCardItem
                                    key={course.course_id}
                                    text={course.courseName}
                                    path={`/course/${course.course_id}`}
                                />
                            ))}
                        </ul>
                    </div>
                </div>    
            </div>
        </div>
        
    )

}