import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import {Dna} from 'react-loader-spinner';
function Profile() {
    let navigate = useNavigate();
    const [fetchsuccess,setfsuc]=useState(true);
    const [profdet,setprofdet]=useState([]);
    const [extypead,setextypead]=useState();
    const [pass,setpass]=useState();
    const [etypespresent,setpretype]=useState([]);
    // const [newpass,setnpass]=useState();
    // const [passchangepossible,setchangeposs]=useState(false);
    useEffect(()=>{
        if(!localStorage.getItem("token"))
        navigate("./")
        fetchprofdetail();
        fetchexpensetype();
    },[])
//profile details fetch
async function fetchprofdetail() {
  setfsuc(false);
  const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Profile_Details", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token")})
});
const json = await response.json()
// console.log(json);
const element=[]
element[0]=json.data.name;
element[1]=json.data.mobile;
element[2]=json.data.email;
// console.log(element);
setprofdet(element);
setfsuc(true);
}

//fetch expense type
async function fetchexpensetype() {
  setfsuc(false);
  const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Types", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token")})
});
const json = await response.json()
if(json.message=="ok"){
  setpretype(json.data.expense_Type_List);
}
setfsuc(true);
}

//add expense type
async function addexpensetype() {
  setfsuc(false);
  if(extypead.toUpperCase()=="OTHER"||extypead.toUpperCase()=="TRAVEL"||extypead.toUpperCase()=="FOOD"||extypead.toUpperCase()=="GENERAL"){
    alert("This type exists by default")
  }
  else{
  const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/add_User_Expense_Type", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),expense_Type:extypead})
});
const json = await response.json()
fetchexpensetype();
alert(json.message)}
setfsuc(true);
}

//verify old password
async function verifypass() {
  setfsuc(false);
  console.log(extypead);
  const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/verify_User_Password", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),password:pass})
});
const json = await response.json()
console.log(json)
if(json.message=="Correct Password"){
  navigate("../passchange")
}
else{
  alert(json.message||json.error)
}
setfsuc(true);
}
   
    return(
        <>
        {fetchsuccess==false&&<div className="loader-container"><Dna 
  visible={true}
  height="200"
  width={window.screen.width}
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/></div>}<div className='container-fluid'>
        <div className='d-flex justify-content-center'>
          
            <div id='profilebox' className=' rounded'>
              <div className='row'>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Name:</p> <input type="text" class="form-control" disabled value={profdet[0]}></input></div>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Mobile:</p> <input type="text" class="form-control" disabled value={profdet[1]}></input></div>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Email:</p> <input type="text" class="form-control" disabled value={profdet[2]}></input></div>
        <div className='profelement col-sm-6 col-md-4 col-12'><p>Regular expense types:</p> 
        <div class="dropdown">
  <button class="btn btn-light dropdown-toggle form-control" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Expense types
  </button>
  <ul class="dropdown-menu">
    {(()=>{
        let rows = [];
        if(etypespresent.length==0)
        {
          rows.push(
            <li><button class="dropdown-item" type="button" key={100}>Nothing here</button></li>
            );
        }
        else{
        for (let i = 0; i < etypespresent.length; i++) {
          rows.push(
            <li><button class="dropdown-item" type="button" key={i}>{etypespresent[i].expense_Type}</button></li>
            );
        }}
        return rows;
    })()}
  </ul>
</div>
        </div>
        <div className='profelement col-sm-6 col-md-4 col-12'>
            Add your regular expense types:
            <form className='row g-2 my-2'>
            <div className="col-lg-10 col-md-10 col-sm-10 col-auto">
    <label htmlFor="inputPassword2" className="visually-hidden">Add your regular expense type</label>
    <input type="text" className="form-control" id="inputPassword2" placeholder="Eg:Food" value={extypead} onChange={(e)=>{setextypead(e.target.value)}}/>
  </div>
  <div className="col-lg-2 col-md-2 col-sm-2 col-auto">
    <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{e.preventDefault();addexpensetype()}}>Add</button>
  </div></form>
        </div>
        </div>
        <div className='d-flex justify-content-between'>
        <button className='btn btn-dark' onClick={()=>{localStorage.clear(); navigate("../");}} >log out</button>
        <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#exampleModal">Change password</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id='mymodal'>
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Enter old password</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className='form-floating my-2'>
            <input type="password" className="form-control" id="floatingInputGrid" onChange={(e)=>{e.preventDefault();setpass(e.target.value)}}  value={pass}/>
           <label htmlFor="floatingInputGrid">Old password</label>
           </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={verifypass}>Verify</button>
      </div>
    </div>
  </div>
</div>
        </div>
        </div>
        </div>
      </div>
<Outlet/>
        </>
    );
    }

export default Profile;