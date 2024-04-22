import React, { useEffect, useState } from 'react'
import './sidebar.css'
import Navbar from '../Navbar'
import Hero from '../Hero'
import Banner from '../../assets/images/Hassan2.jpg'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const token = localStorage.getItem("token");
    const [user_token, setUser_token] = useState("");
    const [userAuthentication, setUserAuthentication] = useState(null);
    var http;
    http = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_token}`,
      },
    });
    useEffect(() => {
      window.scrollTo(0, 0);
      const token = localStorage.getItem("token");
      if (token) {
        switchDashboard();
        setUser_token(token);
      }
    }, [user_token]);
    async function switchDashboard() {
      const resp = await http.get("/users/user-authentication");
      if(resp.data){
        setUserAuthentication(resp.data);
      }
    }
    const logout = () => {
        localStorage.removeItem('token');
    }
    return (
        <div>
            <Navbar  user = {userAuthentication?userAuthentication:""}/>
            <Hero
                cName="hero"
                HeroImg={Banner}
                title="Dashboard"
            />
            <div class="sidenav">
                <Link to={"admins"}><i className='fa-solid fa-user' style={{"margin-right": "24px"}}></i>Users</Link>
                <Link to={"cities"}><i className='fa-solid fa-location-dot' style={{"margin-right": "25px"}}></i>Cities</Link>
                <Link to={"bookings"}><i className='fa-solid fa-calendar-days' style={{"margin-right": "5px"}}></i>Bookings</Link>
                <Link to={"contacts"}><i className='fa-solid fa-message' style={{"margin-right": "1px"}}></i>Contacts</Link>
               <Link to="/" onClick={() => logout()}><i className='fa-solid fa-right-from-bracket' style={{"margin-right": "25px"}}></i>Logout</Link>
            </div>
            <div class="main">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard