import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutImg from '../assets/images/Hassan2.jpg';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookingSuccess() {
    const fullName = localStorage.getItem("fullName");
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
      userInfo();
        setUser_token(token);
    }
}, [user_token]);
  async function userInfo() {
    const resp = await http.get("/users/user-authentication");
    setUserAuthentication(resp.data);
  }
    return (
        <div>
           <Navbar  user = {userAuthentication?userAuthentication:""}/>
            <Hero
                cName="hero-mid"
                HeroImg={AboutImg}
                title="Awesome!"
                btnClass="hide"
            />
            <div className='form-container'>
                <h1>Merci <span style={{color: "red"}}>{fullName}</span> pour la planification.</h1>
                <h1>Votre réservation a été effectuée.</h1>
                <Link to="/" style={{"textDecoration": "none"}}><button>Retour à la page d'accueil</button></Link>
            </div>
            <Footer />
        </div>
    )
}

export default BookingSuccess