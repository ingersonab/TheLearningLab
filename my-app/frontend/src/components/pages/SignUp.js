import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'
import '../../App.css';


function Signup() {
  const myStyle = {
    backgroundColor: "#74bc3c",
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
      email: '',        
      password: ''    
    })    
    const navigate = useNavigate();    
    const [errors, setErrors] = useState({})    
    const handleInput = (event) => {        
      setValues(prev => ({...prev, [event.target.name]: event.target.value}))    
    }    
    const handleSubmit = (event) => {        
      event.preventDefault();        
      const err = Validation(values);  
      setErrors(err);         
      if(err.name === "" && err.email === "" && err.password === "") {            
        axios.post('http://localhost:8081/signup', values)            
        .then(res => {                
          navigate('/');            
        })            
        .catch(err => console.log(err));        
      }    
    }
    return (    
      <div className='d-flex justify-content-center align-items-center bg-success vh-100'>        
      <div className='bg-white p-3 rounded w-25' style={myStyle}>            
        <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={200} width={200} />           
        <h2>Sign-Up</h2>            
        <form action="" onSubmit={handleSubmit}>                
          <div className='mb-3'>                    
            <label htmlFor="name"><strong>Name: &nbsp;</strong></label>                    
            <input type="text" placeholder='Enter Name' name='name' onChange={handleInput} className='rounded-0'/>                    
            {errors.name && <span className='text-danger'> {errors.name}</span>}                
          </div>                
          <div className='mb-3'>                    
            <label htmlFor="email"><strong>Email: &nbsp;</strong></label>                    
            <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='rounded-0'/>                    
            {errors.email && <span className='text-danger'> {errors.email}</span>}                
          </div>                
          <div className='mb-3'>                    
            <label htmlFor="password"><strong>Password: &nbsp;</strong></label>                    
            <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='rounded-0'/>                    
            {errors.password && <span className='text-danger'> {errors.password}</span>}                
          </div>  
          <h4>Are you a teacher or a student?</h4>
          <div>
            <label>
              <input type="radio" name="user_type" value="teacher"/>
              Teacher
            </label>
          </div> 
          <div>
            <label>
              <input type="radio" name="user_type" value="student" checked/>
              Student
            </label>
          </div>             
          <button type='submit' className='btn btn-primary w-100 rounded-0'> Sign up</button>                
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>            
      </form>        
      </div></div>  
    )
}

export default Signup;