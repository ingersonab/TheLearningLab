import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'
import bcrypt from 'bcryptjs';
import '../../App.css';

function Signup() {

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

    //const API_BASE_URL = 'http://LearningLabServer-dev.us-east-1.elasticbeanstalk.com';
    const API_BASE_URL = 'http://localhost:8081';

    const [values, setValues] = useState({        
      name: '',        
      email: '',        
      password: '',
      userType: ''    
    })  
    const [selectedUserType, setSelectedUserType] = useState('');  
    const navigate = useNavigate();    
    const [errors, setErrors] = useState({})    
    const handleInput = (event) => {   
      const { name, value, type, checked } = event.target;

      console.log('Name:', name);
      console.log('Value:', value);
      console.log('Type:', type);
      console.log('Checked:', checked);

      if (type !== 'radio') {
        setValues(prev => ({ ...prev, [name]: value }));
      } else if (checked) {
        setValues(prev => ({ ...prev, userType: value }));
      }
    };

    useEffect(() => {
      console.log('Updated Values:', values);
    }, [values]);
    
    const handleSubmit = async (event) => {        
      event.preventDefault();        
      const err = Validation(values);  
      setErrors(err); 
      const radioButtons = document.querySelectorAll('input[name="userType"]');
      let userType = '';
      for(const radioButton of radioButtons){
        if(radioButton.checked){
          userType = radioButton.value;
          break;
        }
      }
      setSelectedUserType(userType);

      await new Promise(resolve => {
        setValues(prev => ({ ...prev, userType: userType }));
        resolve()
      });
      
      if(err.name === "" && err.email === "" && err.password === "") {            
        
        const hashedPassword = bcrypt.hashSync(values.password, 10);

        axios.post(`${API_BASE_URL}/signup`, { ...values, password: hashedPassword})            
        .then(res => { 
          alert("Account successfully created!");               
          navigate('/login');            
        })            
        .catch(err => {
          if(err.response && err.response.status === 400){
            alert("Email is already in use. Please use a different email.");
          }else{
            console.error(err);
            alert("An unexpected error occurred.");
          }})      
      }
          
    }
    
    return (    
      <div className='d-flex justify-content-center align-items-center bg-success vh-100'>        
      <div className='bg-white p-3 rounded w-25' style={myStyle}>            
        <img src={require('../../logo.jpeg')} alt='logo image' height={200} width={200} />           
        <div className='form-container'>
          <h2 style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>Sign-Up</h2>            
          <form action="" onSubmit={handleSubmit}>                
            <div className='mb-3'>                    
              <label htmlFor="name" style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}><strong>Name: &nbsp;</strong></label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
              <input type="text" placeholder='Enter Name' name='name' style={{maxWidth: '100%', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"}} onChange={handleInput} className='rounded-0'/>                    
              <br/>
              {errors.name && <span className='text-danger' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}> {errors.name}</span>}                
            </div>                
            <div className='mb-3'>                    
              <label htmlFor="email" style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}><strong>Email: &nbsp;</strong></label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
              <input type="email" placeholder='Enter Email' name='email' style={{maxWidth: '100%', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"}} onChange={handleInput} className='rounded-0'/>                    
              <br/>
              {errors.email && <span className='text-danger' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}> {errors.email}</span>}                
            </div>                
            <div className='mb-3'>                    
              <label htmlFor="password" style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}><strong>Password: &nbsp;</strong></label>                    
              <input type="password" placeholder='Enter Password' name='password' style={{maxWidth: '100%', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"}} onChange={handleInput} className='rounded-0'/>                    
              <br/>
              {errors.password && <span className='text-danger' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}> {errors.password}</span>}                
            </div>  
            <h4 style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>Are you a teacher or a student?</h4>
            <div>
              <label>
                <input type="radio" name="userType" value="teacher" style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }} onChange={handleInput}/>
                Teacher
              </label>
              <br/>
              <label>
                <input type="radio" name="userType" value="student" onChange={handleInput} style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}/>
                Student
              </label>
            </div>             
            <button type='submit' className='btn bg-primary w-100 rounded-0' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}> Sign up</button>                
            <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>Have an account? Log in</Link>            
        </form>
      </div>       
      </div></div>  
    /* <div>
      {selectedUserType ? `You selected ${selectedUserType}` : `You haven't selected any user type`}
    </div>*/
    )
}

export default Signup;