import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState} from 'react';
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";

function Yearstat() {
    const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(25, 99, 132)",
          borderColor: "rgb(155, 199, 132)",
          data: [3, 10, 5, 2, 20, 30, 45,52,20,30,10],
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
                {labels.map((month, index) => (
        <div className='col-md-4' key={index}>
          <div className='mycal rounded'><h5>{month}</h5><h4>10000Rs</h4></div>
        </div>
      ))}
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