import '../App.css';
import {Outlet, Link,useNavigate } from "react-router-dom";
import React, {useState} from 'react';
import homeim from '../back.png';
import fpvid from '../fpvideo.mp4';
import fetearevid from '../Coin Book.mp4'
function Home() {
    return(
        <>
       {/* <img src={homeim}  id='initpage'/> */}
       <video width={window.screen.width-20} height={window.screen.height-48} fluid={false} autoPlay muted>
        <source src={fpvid}/>
       </video>
       <video width={window.screen.width-20} height={window.screen.height-48} fluid={false} autoPlay muted loop>
        <source src={fetearevid}/>
       </video>
<Outlet/>
        </>
    );
    }

export default Home;