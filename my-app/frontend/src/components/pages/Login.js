import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import '../../App.css';

function Login() {  
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
    email: '',        
    password: ''    
  })    
  const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [backendError, setBackendError] = useState([])
    const handleInput = (event) => {        
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))    
    }   
    const handleSubmit =(event) => {        
      event.preventDefault();        
      const err = Validation(values);  
      setErrors(err);        
      if(err.email === "" && err.password === "") {            
        axios.post('http://localhost:8081/login', values)            
        .then(res => {                
          if(res.data.errors) {                    
            setBackendError(res.data.errors);                
          } else {                    
            setBackendError([]);                    
            if(res.data.status === "Success") {                        
              const userType = res.data.userType;
              if(userType === "teacher"){
                navigate('/teacherhome');
              }else if(userType === "student"){
                navigate('/studenthome');
              }else{
                alert("Invalid userType received");
              }                     
            } else {                        
              alert("Email or Password is incorrect, or account does not exist.");     
            }                
          }                            
        })            
        .catch(err => console.log(err));        
      }    
    }

    return (    
    <div className='d-flex justify-content-center align-items-center bg-success vh-100'>        
      <div className='bg-white p-3 rounded w-25' style={myStyle}>
        <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={200} width={200} />            
        <h2>Login</h2>            
        {backendError ? backendError.map( e => (<p className='text-danger'>{e.msg}</p>)) : <span></span>}            
        <form action="" onSubmit={handleSubmit}>                
          <div className='mb-3'>                    
            <label htmlFor="email"><strong>Email: &nbsp;</strong></label>                    
            <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='rounded-0'/>                    
            <br/>
            {errors.email && <span className='text-danger'> {errors.email}</span>}
          </div>                
          <div className='mb-3'>                    
            <label htmlFor="password"><strong>Password: &nbsp;</strong></label>                    
            <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='rounded-0'/>                    
            <br/>
            {errors.password && <span className='text-danger'> {errors.password}</span>}                
          </div>                
          <button type='submit' className='btn bg-primary w-100 rounded-0'> Log in</button>                              
          <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>            
        </form>        
      </div>    
    </div>  
    )
}

export default Login;