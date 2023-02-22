import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState} from 'react';

function Log() {

    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem("token",json.authtoken);
            alert("succes");
            navigate("main");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    var lst={
        display:"flex",
        justifyContent:"center",
        position:"relative",
        top:200
    };
    var st={
        textAlign:"center",
        padding:4
    };
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div  style={lst}>
            <div className="wrap">
            <h2  style={st}>Log in</h2>
            <fieldset>
        <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={credentials.email} onChange={onChange} name="email"/>
  <label htmlFor="floatingInput" >Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  value={credentials.password} onChange={onChange} name="password"/>
  <label htmlFor="floatingPassword">Password</label>
</div>
<div className='d-grid gap-2 my-4'>
<button className='btn  btn-primary'>Submit</button>
</div>
<div className='d-grid gap-2 my-4'>
<Link to="/sign"><button className='btn  btn-dark'>Sign in</button></Link>
</div>
</fieldset>
</div>
</div>
<div></div>
</form>
<Outlet/>
        </>
    );
    }

export default Log;