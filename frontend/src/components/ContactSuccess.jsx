import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Hero from './Hero';
import AboutImg from '../assets/images/contact-banner.jpg';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './ContactSuccessStyle.css';
import axios from 'axios';

function ContactSuccess() {
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
    const name = localStorage.getItem("contactName").toUpperCase();
    const removeContactName = () => {
        localStorage.removeItem("contactName");
    }
    return (
        <>
            <Navbar  user = {userAuthentication?userAuthentication:""}/>
            <Hero
                cName="hero-mid"
                HeroImg={AboutImg}
                title="Contact"
                btnClass="hide"
            />
            <div id='message'>
                <h1>Merci <span style={{color: "red"}}>{name}</span> de nous contacter</h1>
                <p>Votre soutien et votre confiance en nous sont très appréciés.</p>
            <Link to="/" onClick={() => removeContactName()}><button>Retour à la page d'accueil</button></Link>
            </div>
            <Footer />
        </>
    )
}

export default ContactSuccess