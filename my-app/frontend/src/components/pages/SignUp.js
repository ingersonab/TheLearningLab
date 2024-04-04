import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'
import bcrypt from 'bcryptjs';
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

        axios.post('http://localhost:8081/signup', { ...values, password: hashedPassword})            
        .then(res => { 
          alert("Account successfully created!");               
          navigate('/');            
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
        <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={200} width={200} />           
        <h2>Sign-Up</h2>            
        <form action="" onSubmit={handleSubmit}>                
          <div className='mb-3'>                    
            <label htmlFor="name"><strong>Name: &nbsp;</strong></label>                    
            <input type="text" placeholder='Enter Name' name='name' onChange={handleInput} className='rounded-0'/>                    
            <br/>
            {errors.name && <span className='text-danger'> {errors.name}</span>}                
          </div>                
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
          <h4>Are you a teacher or a student?</h4>
          <div>
            <label>
              <input type="radio" name="userType" value="teacher" onChange={handleInput}/>
              Teacher
            </label>
            <br/>
            <label>
              <input type="radio" name="userType" value="student" onChange={handleInput}/>
              Student
            </label>
          </div>             
          <button type='submit' className='btn bg-primary w-100 rounded-0'> Sign up</button>                
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>            
      </form>       
      </div></div>  
    /* <div>
      {selectedUserType ? `You selected ${selectedUserType}` : `You haven't selected any user type`}
    </div>*/
    )
}

export default Signup;