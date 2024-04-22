import React, {useState, useEffect} from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Courses() {
  const myStyle = {
    backgroundColor: "#53b2d8",
    backgroundPosition: "center",
    backgroundSize: "fill",
    backgroundRepeat: "no-repeat",
    color: "black",
    fontSize: "20px",
    width: '100vw',
    height: '100vh',
    textAlign: "center",
    marginTop: "80px",
    position: "absolute",
    top: 0
  };

  const [values, setValues] = useState({        
    name: '',
    description: ''
  }) 

  const navigate = useNavigate();    
  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
    const {name, value} = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    if(!values.name.trim() || !values.description.trim()){
      setErrors({name: 'Name cannot be empty', description: 'Description cannot be empty' });
      return;
    }

    const userId = sessionStorage.getItem('userId');
    if(!userId){
      console.error('User ID not found in session storage');
      return;
    }

    axios.post('http://localhost:8081/createCourse', { ...values, userId })
    .then(res => {
      alert("Course created successfully!");
      navigate('/teachercoursehome');
    })
    .catch(err => {
      console.error(err);
      alert("An unexpected error occurred.");
    });

  }

  return (
    <div className="course-form-container" style={myStyle}>
      <div className='d-flex justify-content-center align-items-center bg-success vh-100'>        
        <div className='bg-white p-3 rounded w-25' style={myStyle}>
            <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={200} width={200} />            
          <div className='form-container'> 
            <h2 style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>Create Course</h2>                        
            <form action="" onSubmit={handleSubmit}>                
              <div className='mb-3'>                    
                <label htmlFor="name" style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}><strong>Course Name: &nbsp;</strong></label>
                &nbsp;                   
                <input type="text" placeholder='Enter Name' name='name' style={{maxWidth: '100%', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"}} onChange={handleInput} className='rounded-0'/>                    
                <br/>
                {errors.name && <span className='text-danger' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}> {errors.name}</span>}                
                </div>                
                <div className='mb-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>                    
                <label htmlFor="description" style={{width: '50px', textAlign: 'center', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"}}><strong>Description: &nbsp;</strong></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            
                <div style={{flex: 1, marginLeft: '10px', maxWidth: '300px'}}>
                  <textarea
                    placeholder='Enter Description'
                    name='description'
                    onChange={handleInput}
                    className='rounded-0'
                    style={{ width: '100%', resize: 'vertical', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}
                  />  
                </div>                  
                <br/>
                {errors.description && <span className='text-danger' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}> {errors.description}</span>}                
              </div>                                             
              <button type='submit' className='btn bg-primary w-100 rounded-0' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}> Add course</button>                           
            </form> 
          </div>     
        </div>    
      </div> 
    </div>
  );
}
