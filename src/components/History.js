import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState} from 'react';

function History() {
  var textcolor={
    color:"#dbf3c1"
  };
const [date,setdate]=useState();
const [expensedetail,setedetail]=useState([]);
  const onChange = (e)=>{
    setdate(e.target.value);
  }

  const handleSubmit = async (e) => {
    
    var year=date.substring(0,4);
    var month=((parseInt(date.substring(5,7))-1).toString());
    var day=((parseInt(date.substring(8))).toString());
      e.preventDefault();
      const response = await fetch("http://localhost:5000/user/fetch_User_Expense_Details_Daily", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          
          body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
      });
      const json = await response.json()
      console.log(json);
      setedetail(json[0].details.expense);
  }
    return(
        <>
        {(localStorage.getItem("token"))?
        <div className=' my-4 row mx-4'>
        <div className='col-md-8'>
            <h3 style={textcolor}>Check your previous expense</h3>
     <div className="form-floating my-3">
           <input type="date" className="form-control" id="floatingInputGrid" value={date} name="value" onChange={onChange}/>
           <label for="floatingInputGrid">Date of expenses</label>
         </div>
     <div class="d-grid col-6 mx-auto my-3">
     
  <button class="btn btn-info" type="button" onClick={handleSubmit}>Search</button>
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
        <th>400</th>
        </tr>
        </table>
     </div>
     </div>
     <div className='col-md-4 col-6 '>
        <div className='mainf'>
        <Link to="/year"> <div className='circstat'><h5>10215</h5><h4>Expense of year</h4></div></Link>
        <Link to="/month"><div className='circstat'><h5>10215</h5><h4>Expense of month</h4></div></Link>
        <div className='circstat'><h5>10215</h5><h4>Expense of day</h4></div>
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