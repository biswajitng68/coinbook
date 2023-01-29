import './App.css';
import {Outlet, Link } from "react-router-dom";
function Log() {
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
        <div  style={lst}>
            <div className="wrap">
            <h2  style={st}>Log in</h2>
            <fieldset>
        <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
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
<Outlet/>
        </>
    );
}

export default Log;