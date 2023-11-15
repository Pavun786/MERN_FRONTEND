import React, { useState } from 'react';
import {Container,Form,Button} from "react-bootstrap";
import "../styles/Login.css"
import {Link , useNavigate} from "react-router-dom";
import axios from "axios";
import API_URL from '../../config/global';

export default function Login() {

    const [formData,setFormData] = useState({
       
        email:"",
        password:""
     })

     const navigate = useNavigate()
   
     const handleChange =(e)=>{
        const {name,value} = e.target;
        setFormData({...formData ,[name] : value})  
        // name --> is atribute
        // here why we given [name]: value is,Genrely we set object as current state .
        //so,when we change the values,then it update value in that particular feild.
      }
    
      const handleSubmit = async(e) =>{
        e.preventDefault();  // write for prevent from page refresh when onSubmit occure.
        // console.log(formData)
        
        const response = await axios.post(`${API_URL}/login`,formData)
        console.log(response)

        if(response.data == "Invalid User name or password"){
          
          alert("Invalid User name or Password")
        
        }else if(response.data == "Server Busy"){
          
          alert("verify your email id")
        
        }else if(response?.status){
          
          localStorage.setItem("userInfo",JSON.stringify(response.data))
          
          navigate("/home")
        }
 }

  return (
    <Container>
    <h1>Login</h1>
    <Form onSubmit={handleSubmit}>
   
    <Form.Group >
       <Form.Label>Email</Form.Label>
       <Form.Control type="email" name='email' value={formData.email} onChange={handleChange} />
    </Form.Group>
    
    <Form.Group >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name='password' value={formData.password} onChange={handleChange} />
    </Form.Group>
   
     <Button variant='primary' type='submit'>Login</Button>
  
  </Form>
  </Container>
  )
}
