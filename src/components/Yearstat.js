import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";

function Yearstat() {
  var date=new Date();
  var month=date.getMonth().toString();
  var year=date.getFullYear().toString();
  var day=date.getDate().toString();
  const [yrdetail,setyrdetail]=useState([]);
  useEffect(() => {
    fetchyerData();

  },[]);  

  async function fetchyerData() {
    const response = await fetch("http://localhost:5000/user/fetch_User_Expense_Details_Yearly", {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   
   body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
  });
  const json = await response.json()
  let j=0;
  let exar=[]
  for(let i=0;i<12;i++){
    if(j<json.length&&(i==parseInt(json[j]._id)))
    {exar[i]=json[j].sum;
    j++;}
    else
    {exar[i]=0;}
  }
 setyrdetail(exar);
  }

  const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Expense vs month",
          backgroundColor: "rgb(25, 99, 132)",
          borderColor: "rgb(155, 199, 132)",
          data: yrdetail,
        },
      ],
    };
    return(
        <>
        {(localStorage.getItem("token"))?
        <div className='row mx-3 my-3'>
            <div className='col mycalback rounded'>
              <h3>Your yearly expense stat</h3>
                <div className='row'>
                {/* {labels.map((month, index) => (
        <div className='col-md-4' key={index}>
          <div className='mycal rounded'><h5>{month}</h5><h4>10000Rs</h4></div>
        </div>
      ))} */}
       {(() => {
        let rows = [];
        for (let i = 0; i < yrdetail.length; i++) {
          rows.push(<div className='col-md-4' key={i}>
          <div className='mycal rounded'><h5>{labels[i]}</h5><h4>{yrdetail[i]}</h4></div>
        </div>
            );
        }
        return rows;
      })()}
                </div>
            </div>
        <div className='col'>
          <div className='chartstat shadow-lg p-2 rounded'><Bar  data={data} /></div>
          <div className='chartstat shadow-lg p-2  rounded'><Line  data={data} /></div>
        </div>
        </div>
       :
       <div>sorry you have to login first</div>
       }
<Outlet/>
        </>
    );
    }

export default Yearstat;