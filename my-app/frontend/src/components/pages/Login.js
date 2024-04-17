import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import bcrypt from 'bcryptjs';
import '../../App.css';


function Login() {  
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
      top: 0,
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
    axios.defaults.withCredentials = true;

    //session storage redirect
    useEffect(() => {
      console.log('User Type in Session Storage:', sessionStorage.getItem('userType'));
      if (sessionStorage.getItem('userType') === 'student') {
          console.log('Redirect to studenthome');
          navigate('/studenthome');
      } else if (sessionStorage.getItem('userType') === 'teacher') {
          console.log('Redirect to teacher home');
          navigate('/teacherhome');
      }
    }, []);

    /*const handleLogout = () =>{
      sessionStorage.removeItem('userType');
      sessionStorage.removeItem('userId');
      navigate('/login');
    }*/
    
    //initial redirect
    useEffect(() => {
      const userType = sessionStorage.getItem('userType');
      if (!userType) {
        axios.get('http://localhost:8081/studenthome')
        .then(res => {
          if (res.data.valid) {
          console.log('Student Home Response: ', res.data);
          navigate('/studenthome');
        }
        })
        .catch(err => console.log(err));

        axios.get('http://localhost:8081/teacherhome')
        .then(res => {
          if (res.data.valid) {
            console.log('Teacher Home Response: ', res.data);
            navigate('/teacherhome');
          }
        })
        .catch(err => console.log(err));
      }
    }, [navigate]);

    const handleSubmit =(event) => {        
      event.preventDefault();        
      const err = Validation(values);  
      setErrors(err);        
      if(err.email === "" && err.password === "") { 

        axios.post('http://localhost:8081/login', {email: values.email, password: values.password})            
        .then(res => {                
          if(res.data.errors) {                    
            setBackendError(res.data.errors);                
          } else {                    
            setBackendError([]);                    
            if(res.data.status === "Success") {                        
              const userType = res.data.userType;
              const userId = res.data.userId;
              
              sessionStorage.setItem('userType', userType) //set userType in session storage
              sessionStorage.setItem('userId', userId);
              console.log("User Type: ", userType);
              console.log("User ID: ", userId)
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
    <div className="login-container">  
      <div className='d-flex justify-content-center align-items-center bg-success vh-100'>        
        <div className='bg-white p-3 rounded w-25' style={myStyle}>
          <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={200} width={200} />            
          <div className='form-container'> 
            <h2>Login</h2>            
            {backendError ? backendError.map( e => (<p className='text-danger'>{e.msg}</p>)) : <span></span>}            
            <form action="" onSubmit={handleSubmit}>                
              <div className='mb-3'>                    
                <label htmlFor="email"><strong>Email: &nbsp;</strong></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
                <input type="email" placeholder='Enter Email' name='email' style={{maxWidth: '100%'}} onChange={handleInput} className='rounded-0'/>                    
                <br/>
                {errors.email && <span className='text-danger'> {errors.email}</span>}
              </div>                
              <div className='mb-3'>                    
                <label htmlFor="password"><strong>Password: &nbsp;</strong></label>                    
                <input type="password" placeholder='Enter Password' name='password' style={{maxWidth: '100%'}} onChange={handleInput} className='rounded-0'/>                    
                <br/>
                {errors.password && <span className='text-danger'> {errors.password}</span>}                
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
              <button type='submit' className='btn bg-primary w-100 rounded-0'> Log in</button>                              
              <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>            
            </form>
          </div>       
        </div>    
      </div> 
    </div> 
  )
}

export default Login;