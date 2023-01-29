import './App.css';
import {Outlet, Link } from "react-router-dom";
function Sign() {
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
        <div  style={lst}>
            <div className="wrap" style={nst}>
                <h2  style={st}>Sign in</h2>
            <fieldset>
            <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Name</label>
</div>
<div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Mobile</label>
</div>
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
<Link to="/"><button className='btn  btn-dark'>Log in</button></Link>
</div>
</fieldset>
</div>
</div>
<div></div>
<Outlet/>
        </>
    );
}

export default Sign;