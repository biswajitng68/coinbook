import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState} from 'react';
import homeim from '../back.png';

function Home() {
    return(
        <>
       <img src={homeim}  className='img-fluid'/>
<Outlet/>
        </>
    );
    }

export default Home;