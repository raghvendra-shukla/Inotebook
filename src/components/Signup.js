import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const handleonsubmit= async (e)=>{
        e.preventDefault();
        // const  {name,email,password}=credentials;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,passward:credentials.password})
          });
          const json= await response.json(); 
          console.log(json);
          if(json.success){
            localStorage.setItem("token",json.Authtoken);
            navigate("/");
            props.showAlert("Signup Successfully","success")
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
      <h1>Create a account to use iNotebook</h1>
    <form onSubmit={handleonsubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={handleonchange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleonchange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password"onChange={handleonchange} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword"onChange={handleonchange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Signup