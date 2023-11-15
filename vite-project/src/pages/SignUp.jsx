import React, { useState } from 'react';
import {Container,Form,Button} from "react-bootstrap";
import "../styles/SignUp.css"
import {Link , useNavigate} from "react-router-dom";
import axios from "axios";
import API_URL from '../../config/global';

export default function SignUp() {

  const [formData,setFormData] = useState({
     name :"",
     email:"",
     password:""
  })

  const navigate = useNavigate();

  const handleChange =(e)=>{
    const {name,value} = e.target;
    setFormData({...formData ,[name] : value})  
    // name --> is atribute
    // here why we given [name]: value is,Genrely we set object as current state .
    //so,when we change the values,then it update value in that particular feild.
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
     const response = await axios.post(`${API_URL}/signin/verify`,formData)
     console.log(response)

     if(response.data === true){
       
       alert("Registeration link sent to your Email Id")
    
    }else if(response.data === false){
      
      alert("user already exists")
    }

    }catch(e){
     
      console.error("Error during registeration",e)
    }

    // console.log(formData)
  }

  return (
    <Container>
        <h1>Registration Form</h1>
        <Form onSubmit={handleSubmit}>
      
      <Form.Group >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' value={formData.name} onChange={handleChange}/>
      </Form.Group>
      
      <Form.Group >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name='email' value={formData.email} onChange={handleChange} />
      </Form.Group>
      
      <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' value={formData.password} onChange={handleChange} />
      </Form.Group>
      
      <Button variant='primary' type='submit'>Register</Button>
      <p>Already have an account? <Link to="/login">Login</Link></p> 
    </Form>
    </Container>
  )
}
