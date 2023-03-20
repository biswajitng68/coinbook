import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState,useEffect,useRef} from 'react';
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import {Dna} from 'react-loader-spinner';
function Monthstat() {
  let navigate = useNavigate();
  const [fetchsuccess,setfsuc]=useState(true);
  const dataFetchedRef = useRef(false);
  const mon = localStorage.getItem("mon")
  console.log(mon)
  var date=new Date();
  var totalday=daysInMonth(((!mon)?date.getMonth()+1:parseInt(mon)+1),date.getFullYear());
  var month=!mon?date.getMonth().toString():mon.toString();
  var year=date.getFullYear().toString();
  var day=date.getDate().toString();
  const [modetail,setmodetail]=useState([]);
  const [selmon,setmon]=useState();
  var monthname=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  useEffect(() => {
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
    fetchmoData();
if(localStorage.getItem("mon")){
  
localStorage.removeItem("mon")}
  },[]);  

  async function fetchmoData() {
    setfsuc(false);
    setmon(month)
    console.log(selmon);
    const response = await fetch("https://coin-book-app-backend-mern4.onrender.com/user/fetch_User_Expense_Details_Monthly", {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   
   body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
  });
  const json = await response.json()
  let j=0;
  let exar=[]
  for(let i=0;i<totalday;i++){
    if(j<json.length&&(i==parseInt(json[j]._id)-1))
    {exar[i]=json[j].sum;
    j++;}
    else
    {exar[i]=0;}
  }
 setmodetail(exar);
 setfsuc(true);
  }

  function daysInMonth (month, year) {
    console.log(month);
    return new Date(year, month, 0).getDate();
}
  console.log(totalday);
    var labels = [];
    for (let index = 0; index < totalday; index++) {
        labels[index] = "Day"+(index+1);
        
    }
    const data = {
      labels: labels,
      datasets: [
        {
          label: "expense vs day",
          backgroundColor: "rgb(25, 99, 132)",
          borderColor: "rgb(155, 199, 132)",
          data: modetail,
        },
      ],
    };
    return(
        <>
        {(localStorage.getItem("token"))?
        <>
         {fetchsuccess==false&&<div className="loader-container"><Dna 
  visible={true}
  height="200"
  width={window.screen.width}
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/></div>}
        <div className='row mx-3 my-3'>
            <div className='col-lg-6 col-md-12 mycalback rounded'>
              <h3>Your {monthname[selmon]} month expense stat</h3>
                <div className='row'>
                    {(() => {
                      let rows = [];
                      for (let i = 0; i < modetail.length; i++) {
                        console.log(selmon);
                        rows.push(<div className='col-md-2 col-sm-4 col-4' key={i}>
                        <div className='mycal rounded' id='mycalmonth' onClick={()=>{localStorage.setItem("day",i+1);localStorage.setItem("mon",parseInt(selmon)+1);navigate("../history")}}><p className='eraser'>{labels[i]}</p><p className='eraser'>Rs {modetail[i]}</p></div>
                      </div>
                          );
                      }
                      return rows;
                    })()}
                </div>
            </div>
        <div className='col-lg-6'>
          <div className='chartstat shadow-lg p-2 rounded mx-2 my-2'><Bar  data={data} /></div>
          <div className='chartstat shadow-lg p-2  rounded mx-2 my-2'><Line  data={data} /></div>
        </div>
        </div>
        </>
       :
       <div>sorry you have to login first</div>
       }
<Outlet/>
        </>
    );
    }

export default Monthstat;