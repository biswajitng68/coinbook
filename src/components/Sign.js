import '../App.css';
import {Outlet, Link ,useNavigate} from "react-router-dom";
import { useState } from 'react';
function Sign() {

    const [credentials, setCredentials] = useState({name:"", mobile:"", email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,mobile,password}=credentials
        console.log(credentials);
        const response = await fetch("http://localhost:5000/user/sign", {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                 "Access-Control-Allow-Origin": "*",

            },
            
            body: JSON.stringify({name, email, mobile, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            //localStorage.setItem('token', json.authtoken); 
            navigate("/")
            alert("succes");

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
        top:120
    };
    var nst={
        width:400
    };
    var st={
        textAlign:"center",
        padding:4
    };
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div  style={lst}>
            <div className="wrap" style={nst}>
                <h2  style={st}>Sign in</h2>
            <fieldset>
            <div className="form-floating mb-3">
  <input  className="form-control" id="floatingInput"  name='name' value={credentials.name} onChange={onChange}/>
  <label htmlFor="floatingInput">Name</label>
</div>
<div className="form-floating mb-3">
  <input  className="form-control" id="floatingInput"  name='mobile' value={credentials.mobile} onChange={onChange}/>
  <label htmlFor="floatingInput">Mobile</label>
</div>
        <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' value={credentials.email} onChange={onChange}/>
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={credentials.password} onChange={onChange}/>
  <label htmlFor="floatingPassword">Password</label>
</div>
<div className='d-grid gap-2 my-4'>
<button className='btn  btn-primary'>Submit</button>
</div>
<div className='d-grid gap-2 my-4'>
<Link to="/"><button className='btn  btn-dark'>Log in</button></Link>
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

export default Sign;