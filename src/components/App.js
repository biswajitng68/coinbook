
import { Outlet,Link,useNavigate } from 'react-router-dom';
import React from 'react';
import '../App.css';


function App() {
  let navigate=useNavigate();
function logout(e){
  localStorage.clear();
navigate("home");
}
  return (
    <>
    <nav className="navbar navbar-expand-lg sticky-top" id='navs'>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">Coinbook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {localStorage.getItem("token")?<li className="nav-item">
          <Link className="nav-Link active" aria-current="page" to="/main"><button className='btn btn-dark'>Home</button></Link>
        </li>:<p></p>}
        <li className="nav-item mx-3">
          <Link className="nav-Link" to="/about"><button className='btn btn-dark'>About</button></Link>
        </li>
        {localStorage.getItem("token")?<li className="nav-item">
          <Link className="nav-Link active" aria-current="page" to="/history"><button className='btn btn-dark'>History</button></Link>
        </li>:<p></p>}
      </ul>
      {!localStorage.getItem("token")?<Link className="nav-Link" to="/"><button className='btn btn-dark'>Log in</button></Link>:<button className='btn btn-dark' onClick={logout}>log out</button>}
    </div>
  </div>
  
</nav>
<Outlet/>
</>
  );
}

export default App;
