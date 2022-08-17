import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login(props) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})
    const handleonsubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json= await response.json(); 
          console.log(json);
          if(json.success){
            localStorage.setItem("token",json.Authtoken);
            navigate("/");
            props.showAlert("login successfull","success");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }
    const handleonchange=(e)=>{ 
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
  return (
    <div className="container">
        <h1>Login to continue</h1>
    <form onSubmit={handleonsubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleonchange} name="email"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleonchange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Login