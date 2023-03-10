import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useEffect, useState,} from 'react';
import Chart from "chart.js/auto";
import { Bar, Line, Doughnut,Pie } from "react-chartjs-2";


function Yearstat() {
  let navigate = useNavigate();
  var date=new Date();
  var month=date.getMonth().toString();
  var year=date.getFullYear().toString();
  var day=date.getDate().toString();
  const [yrdetail,setyrdetail]=useState([]);
  var types=[];
  var typesums=[];
  var colortypes=["red","blue","yellow","brown","violet","blueviolet","royalblue","gold"]
  const [typesst,settype]=useState([]);
  const [typesumst,settypesum]=useState([]);
  useEffect(() => {
    fetchyerData();
    typewiseyrdata();
  },[]);  

//year data of epense monthsum
  async function fetchyerData() {
    const response = await fetch("https://coinbook.onrender.com/user/fetch_User_Expense_Details_Yearly", {
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

//typewise details fetch
async function typewiseyrdata(){
  const response = await fetch("https://coinbook.onrender.com/user/fetch_User_Expense_TypeWise_Yearly", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    
    body: JSON.stringify({token: localStorage.getItem("token"),month:month,year:year,day:day})
   });
   const json = await response.json()
   console.log(json);
   for(let i=0;i<json.length;i++){
    if(json[i].sum>0){
      types[i]=json[i]._id;
      typesums[i]=json[i].sum;
    }
    settype(types);
    settypesum(typesums);
   }
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
    console.log(typesst);
    console.log(typesumst);
    const datatypewise = {
      labels: typesst,
      datasets: [
        {
          label: "Typewise expenses",
          backgroundColor: colortypes,
          borderColor: "rgb(155, 199, 132)",
          data: typesumst,
        },
      ],
    }; 
    const options = {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        }
      }

    return(
        <>
        {(localStorage.getItem("token"))?
        <div className='row mx-3 my-3'>
            <div className=' col col-md-6 col-lg-6 col-sm-12 mycalback rounded'>
              <h3>Your yearly expense stat</h3>
                <div className='row'>
       {(() => {
        let rows = [];
        for (let i = 0; i < yrdetail.length; i++) {
          rows.push(<div className='col-md-4' key={i}>
          <div className='mycal rounded' onClick={()=>{ localStorage.setItem("mon",i);navigate("../month")}}><h5>{labels[i]}</h5><h4>{yrdetail[i]}</h4></div>
        </div>
            );
        }
        return rows;
      })()}
                </div>
            </div>
        <div className=' col col-md-6 col-lg-6 col-sm-12'>
          <div className='chartstat shadow-lg p-2 rounded'><Bar  data={data} /></div>
          <div className='chartstat shadow-lg p-2  rounded'><p>Typewise expenses</p><div className='chartsp'><Doughnut  data={datatypewise} options={options}  /></div></div>
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