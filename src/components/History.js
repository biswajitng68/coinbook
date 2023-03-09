import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState,useEffect} from 'react';

function History() {
  var textcolor={
    color:"#dbf3c1"
  };
  var ddate=new Date();
var month=ddate.getMonth().toString();
var year=ddate.getFullYear().toString();
var day=ddate.getDate().toString();
var yyear=year
const [date,setdate]=useState();
console.log(date);
const [expensedetail,setedetail]=useState([]);
const [dsum,setdsum]=useState(0);
const [ysum,setysum]=useState(0);
const [msum,setmsum]=useState(0);
const [expense, setExpnses] = useState({type: "General", val:0,info:""}) 
const [ntype,setntype]=useState("General");
const [nval,setnval]=useState(0);
const [ninfo,setninfo]=useState("");
const [dId,setdId]=useState("");
const [eid,seteid]=useState("");
var givendaysum=0;
  const onChange = (e)=>{
    setdate(e.target.value);
  }

  const onexChange = (e)=>{
    setExpnses({...expense, [e.target.name]: e.target.value})
  }
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
    // if(localStorage.getItem("day"))
    // setTimeout(() => {
    //   setdate(selecteddate);
    // }, 1000); 

     function ef(){
     fetchData();
     fetchmoData();
     fetchyrData();
if(localStorage.getItem("day")){
  handleSubmit()
    }}
    ef();
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

//expense add in particular day
const expensehandleSubmit = async (e) => {
  console.log(date);
  var year=date.substring(0,4);
  var month=((parseInt(date.substring(5,7))-1).toString());
  var day=((parseInt(date.substring(8))).toString());
  const value=expense.val
    // e.preventDefault();
    const response = await fetch("https://coinbook.onrender.com/user/add_User_Expense_Daily", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({token: localStorage.getItem("token"), field: expense.type, value,month:month,year:year,day:day,info:expense.info})
    });
    const json = await response.json()
    console.log(json);
    handleSubmit(e);
    fetchData();
    fetchmoData();
    fetchyrData();
}

//update particular expense
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
    handleSubmit();
    fetchData();
    fetchmoData();
    fetchyrData();
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
  handleSubmit();
  fetchData();
  fetchmoData();
  fetchyrData();
}

//fetch daywise expense details
  const handleSubmit = async (e) => {
    if(localStorage.getItem("day")){
      var selectmonth=localStorage.getItem("mon").length==1?0+localStorage.getItem("mon"):localStorage.getItem("mon");
      var selectday=localStorage.getItem("day").length==1?0+localStorage.getItem("day"):localStorage.getItem("day");
      var selecteddate=yyear+"-"+selectmonth+"-"+selectday;
      setdate(selecteddate);}
    var year=date?date.substring(0,4):yyear;
    var month=date?((parseInt(date.substring(5,7))-1).toString()):(parseInt(localStorage.getItem("mon"))-1).toString();
    var day=date?((parseInt(date.substring(8))).toString()):localStorage.getItem("day");
      // e.preventDefault();
      if(localStorage.getItem("day")){
        localStorage.removeItem("day")
        localStorage.removeItem("mon")
      }
      console.log(month);
      console.log(day);
      console.log(year);
      const response = await fetch("https://coinbook.onrender.com/user/fetch_User_Expense_Details_Daily", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          
          body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
      });
      const json = await response.json()
      console.log(json);
      if(json[0]){
      setedetail(json[0].details.expense);
      setdId(json[0].details._id)}
      else
      setedetail([]);
  }

    return(
        <>
        {(localStorage.getItem("token"))?
        <div className=' my-4 row mx-4'>
        <div className='col-md-8'>
            <h3 style={textcolor}>Check your previous expense</h3>
     <div className="form-floating my-3">
           <input type="date" className="form-control" id="floatingInputGrid" value={date} name="value" onChange={onChange}/>
           <label htmlFor="floatingInputGrid">Date of expenses</label>
         </div>
     <div className="d-grid col-6 mx-auto my-3">
     
  <button className="btn btn-info" type="button" onClick={handleSubmit}>Search</button>
</div>
{(() => {
        let rows = [];
        console.log(date);
        if(date){
        console.log(date);

          var yyear=parseInt(date.substring(0,4));
  var mmonth=((parseInt(date.substring(5,7))-1));
  var dday=((parseInt(date.substring(8))));
  console.log(year+"-"+month+"-"+day);
  console.log(yyear+"-"+mmonth+"-"+dday);
if(yyear<parseInt(year)||(yyear==parseInt(year)&&(mmonth<parseInt(month)||(mmonth==parseInt(month)&&dday<=parseInt(day))))){
  console.log(date);

          rows.push(
            
            <>
            <h3 style={textcolor}>Add your {date}'s expense</h3>
       <div className="row g-2 ">
       <div className="col-md">
         <div className="form-floating">
           <input type="number" className="form-control" id="floatingInputGrid" onChange={onexChange} name="val" value={expense.val}/>
           <label htmlFor="floatingInputGrid">Expense value</label>
         </div>
       </div>
       <div className="col-md">
         <div className="form-floating">
           <select class="form-select" id="floatingInputGrid" onChange={onexChange} name="type" value={expense.type}>
              <option value="General">Genral</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>
            <label  htmlFor="floatingInputGrid">Expense Type</label>
         </div>
       </div>
     </div>
     <div className="form-floating my-3">
           <input type="text" className="form-control" id="floatingInputGrid" onChange={onexChange} name="info" value={expense.info} />
           <label htmlFor="floatingInputGrid">Expense details</label>
         </div>
     <div class="d-grid col-6 mx-auto my-3">
     
  <button class="btn btn-info" type="button" onClick={expensehandleSubmit}>Add</button>
</div></>
                );
        }}
        else{
        console.log(date);

          rows.push(
            <h4 style={textcolor}>Please enter a valid date to see, add, edit expense history</h4>
            );
        }
        return rows;
      })()}
<h3 style={textcolor}> Your {date} expense sheet </h3>
     <div className='my-4 '>
     <table >
        <tr>
          <th>Change</th>
        <th>Expense type</th>
        <th>Expense details</th>
        <th>Expense</th>
        </tr>
        {(() => {
        let rows = [];
        if(expensedetail.length==0){
          givendaysum=0;
          rows.push(<tr>
            <td></td>
            <td>Please fill the above date</td>
            <td></td>
            </tr>
                );
        }
        else{
        for (let i = 0; i < expensedetail.length; i++) {
          givendaysum+=expensedetail[i].val;
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
        }}
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
        <th>{givendaysum}</th>
        </tr>
        </table>
     </div>
     </div>
     <div className='col-md-4 col-sm-12'>
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

export default History;