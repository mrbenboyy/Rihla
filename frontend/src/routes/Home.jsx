import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Destination from '../components/Destination';
import Trip from '../components/Trip';
import Footer from '../components/Footer';
import Banner from '../assets/images/banner.png'
import axios from 'axios';

export default function Home() {
  const[user_token,setUser_token]=useState('');
  const [userAuthentication, setUserAuthentication] = useState(null);
  var http;
      http = axios.create({
          baseURL: "http://localhost:8080",
          headers:{ "Content-Type":"application/json",
          'Authorization':`Bearer ${user_token}`,
          },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if(token){
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

  return (
   <>
   <Navbar user = {userAuthentication?userAuthentication:""}/>
   <Hero
    cName="hero"
    HeroImg={Banner}
    text="Choisissez Votre Destination Préférée."
    slogan="Book now, Pay later."
    buttonText="Travel Plan"
    url="/"
   />
   <Destination/>
   <Trip/>
   <Footer/>
 </>
  )
}
