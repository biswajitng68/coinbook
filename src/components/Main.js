import '../App.css';
import {Outlet, Link } from "react-router-dom";
import React, {useState,useEffect,useRef} from 'react';

function Main() {
  var textcolor={
    color:"#dbf3c1"
  };
  const dataFetchedRef = useRef(false);
  const [expense, setExpnses] = useState({type: "General", val:0,info:""}) 
var date=new Date();
var month=date.getMonth().toString();
var year=date.getFullYear().toString();
var day=date.getDate().toString();
const [expensedetail,setedetail]=useState([]);
const [dsum,setdsum]=useState(0);
const [ysum,setysum]=useState(0);
const [msum,setmsum]=useState(0);
const [ntype,setntype]=useState("General");
const [nval,setnval]=useState(0);
const [ninfo,setninfo]=useState("");
const [dId,setdId]=useState("");
const [eid,seteid]=useState("");
const onNewtypeChange=(e)=>{
  setntype(e.target.value);
  }
  const onNewvalChange=(e)=>{
    setnval(e.target.value);
    }
  const onNewinfoChange=(e)=>{
      setninfo(e.target.value);
      }

useEffect(() => {
  if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
  fetchData();
  fetchdayData();
  fetchmoData();
  fetchyrData();
},[]);
//fetch day sum
async function fetchData() {
  const response = await fetch("https://coinbook.onrender.com/user/fetch_User_Expense_Sum_Daily", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
});
const json = await response.json()
setdsum(json[0].sum);
}
//fetch monthly sum
async function fetchmoData() {
  const response = await fetch("https://coinbook.onrender.com/user/fetch_User_Expense_Sum_Monthly", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
});
const json = await response.json()
setmsum(json[0].sum);
}
//fetch yearly sum
async function fetchyrData() {
  const response = await fetch("https://coinbook.onrender.com/user/fetch_User_Expense_Sum_Yearly", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
});
const json = await response.json()
setysum(json[0].sum);
}
//fetch expense details
async function fetchdayData() {
  const response = await fetch("https://coinbook.onrender.com/user/fetch_User_Expense_Details_Daily", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
});
const json = await response.json()
setedetail(json[0].details.expense);
setdId(json[0].details._id)
}

const updateexpense = async (e) => {
  
  const response = await fetch("https://coinbook.onrender.com/user/update_Any_User_Expense_", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({token: localStorage.getItem("token"), date_id:dId, expense_id:eid, new_field:ntype, new_value:nval, new_info:ninfo})
  });
  const json = await response.json()
  console.log(json);
  fetchData();
  fetchmoData();
  fetchyrData();
  fetchdayData();
}

//delete particular expense
const deleteexpense = async (exid) => {

const response = await fetch("https://coinbook.onrender.com/user/delete_User_Expense", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    
    body: JSON.stringify({token: localStorage.getItem("token"), date_id:dId, expense_id:exid})
});
const json = await response.json()
console.log(json);
fetchData();
fetchmoData();
fetchyrData();
fetchdayData();
}

//add expense
    const handleSubmit = async (e) => {
      const value=expense.val
        e.preventDefault();
        const response = await fetch("https://coinbook.onrender.com/user/add_User_Expense_Daily", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({token: localStorage.getItem("token"), field: expense.type, value,month:month,year:year,day:day,info:expense.info})
        });
        const json = await response.json()
        console.log(json);
        fetchdayData();
        fetchmoData();
        fetchyrData();
        fetchData();
    }

    const onChange = (e)=>{
      setExpnses({...expense, [e.target.name]: e.target.value})
    }
    return(
        <>
        {(localStorage.getItem("token"))?
        <div className=' my-4 row mx-4'>
        <div className='col-md-8'>
            <h3 style={textcolor}>Add your today's expense</h3>
       <div className="row g-2 ">
       <div className="col-md">
         <div className="form-floating">
           <input type="number" className="form-control" id="floatingInputGrid" onChange={onChange} name="val" value={expense.val}/>
           <label for="floatingInputGrid">Expense value</label>
         </div>
       </div>
       <div className="col-md">
         <div className="form-floating">
           <select class="form-select" id="floatingInputGrid" onChange={onChange} name="type" value={expense.type}>
              <option  value="General">Genral</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>
            <label  htmlFor="floatingInputGrid">Expense Type</label>
         </div>
       </div>
     </div>
     <div className="form-floating my-3">
           <input type="text" className="form-control" id="floatingInputGrid" onChange={onChange} name="info" value={expense.info} />
           <label for="floatingInputGrid">Expense details</label>
         </div>
     <div class="d-grid col-6 mx-auto my-3">
     
  <button class="btn btn-info" type="button" onClick={handleSubmit}>Add</button>
</div>
<h3 style={textcolor}> Today's expense sheet</h3>
     <div className='my-4 table tabl '>
     <table >
        <tr>
          <th>Change</th>
        <th>Expense type</th>
        <th>Expense details</th>
        <th>Expense</th>
        </tr>
        {(() => {
        let rows = [];
        for (let i = 0; i < expensedetail.length; i++) {
          rows.push(<tr key={i}>
            <td>
            <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{
                setntype(expensedetail[i].type);
                setnval(expensedetail[i].val);
                setninfo(expensedetail[i].info);
                seteid(expensedetail[i]._id)}}>Edit</button>
              <button className='btn btn-danger mx-2' onClick={()=>{
                var exid=expensedetail[i]._id;
                 const conf=window.confirm("Please confirm");
                 console.log(conf);
                 if(1||window.confirm("Please confirm")){
                deleteexpense(exid);}}
                }>Delete</button>
            </td>
        <td>{expensedetail[i].type}</td>
        <td>{expensedetail[i].info}</td>
        <td>{expensedetail[i].val}</td>
        </tr>
            );
        }
        return rows;
      })()}
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id='mymodal'>
      <div class="modal-header" >
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit expense</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className='form-floating my-2'>
            <input type="number" className="form-control" id="floatingInputGrid" onChange={onNewvalChange} name="nval" value={nval}/>
           <label htmlFor="floatingInputGrid">Expense value</label>
           </div>
        <div className='form-floating my-2'>
           <select class="form-select" id="floatingInputGrid" onChange={onNewtypeChange} name="ntype" value={ntype}>
              <option value="General">Genral</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>
            <label  htmlFor="floatingInputGrid">Expense Type</label>
           </div>
        <div className='form-floating my-2'>
           <input type="text" className="form-control" id="floatingInputGrid" onChange={onNewinfoChange} name="ninfo" value={ninfo} />
           <label  htmlFor="floatingInputGrid">Expense details</label>
           </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateexpense} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
        <tr>
        <th>Total expense</th>
        <th></th>
        <th></th>
        <th>{dsum}</th>
        </tr>
        </table>
     </div>
     </div>
     <div className='col-md-4 col-6 '>
        <div className='mainf'>
        <Link to="/year"> <div className='circstat'><h5>{ysum}</h5><h4>Expense of year</h4></div></Link>
        <Link to="/month"><div className='circstat'><h5>{msum}</h5><h4>Expense of month</h4></div></Link>
        <div className='circstat'><h5>{dsum}</h5><h4>Expense of day</h4></div>
        </div>
     </div>
     </div>
       :
       <div>sorry you have to login first</div>
       }
<Outlet/>
        </>
    );
    }

export default Main;