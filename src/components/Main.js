import '../App.css';
import {Outlet, Link } from "react-router-dom";
import React, {useState,useEffect,useRef} from 'react';

function Main() {
  var textcolor={
    color:"#dbf3c1"
  };
  const dataFetchedRef = useRef(false);
  const [expense, setExpnses] = useState({type: "", val:0,info:""}) 
var date=new Date();
var month=date.getMonth().toString();
var year=date.getFullYear().toString();
var day=date.getDate().toString();
const [expensedetail,setedetail]=useState([]);
const [dsum,setdsum]=useState(0);
const [ysum,setysum]=useState(0);
const [msum,setmsum]=useState(0);
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
  const response = await fetch("http://localhost:5000/user/fetch_User_Expense_Sum_Daily", {
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
async function fetchdayData() {
  const response = await fetch("http://localhost:5000/user/fetch_User_Expense_Sum_Monthly", {
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
  const response = await fetch("http://localhost:5000/user/fetch_User_Expense_Sum_Yearly", {
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
async function fetchmoData() {
  const response = await fetch("http://localhost:5000/user/fetch_User_Expense_Details_Daily", {
 method: 'POST',
 headers: {
     'Content-Type': 'application/json'
 },
 
 body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
});
const json = await response.json()
setedetail(json[0].details.expense);
}
//add expense
    const handleSubmit = async (e) => {
      const value=expense.val
        e.preventDefault();
        const response = await fetch("http://localhost:5000/user/add_User_Expense_Daily", {
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
           <input type="text" className="form-control" id="floatingInputGrid" onChange={onChange} name="type" value={expense.type}/>
           <label for="floatingInputGrid">Expense type</label>
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
        <th>Expense type</th>
        <th>Expense details</th>
        <th>Expense</th>
        </tr>
        {(() => {
        let rows = [];
        for (let i = 0; i < expensedetail.length; i++) {
          rows.push(<tr key={i}>
        <td>{expensedetail[i].type}</td>
        <td>{expensedetail[i].info}</td>
        <td>{expensedetail[i].val}</td>
        </tr>
            );
        }
        return rows;
      })()}
        
        <tr>
        <th>Total expense</th>
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