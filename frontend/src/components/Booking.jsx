import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutImg from '../assets/images/booking-banner.jpg';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Booking() {
  const cityBooked = localStorage.getItem("cityBooked");
  const navigate = useNavigate();
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

  
  const [from, setFrom] = useState("");
  const [date, setDate] = useState(null);
  const [places, setPlaces] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    const newBooking = {"startLocation": from, "date": date,  "places": places, "cityBooked": cityBooked,"user":userAuthentication};
    await http.post("/bookings/add", newBooking);
    navigate("/booking-success");
    localStorage.setItem("fullName", userAuthentication.fullName?userAuthentication.fullName:"");
  }

  return (
    <div>
        <Navbar  user = {userAuthentication?userAuthentication:""}/>
        <Hero
            cName="hero-mid"
            HeroImg={AboutImg}
            title="Booking"
            btnClass="hide"
        />
        <div className='form-container'>
            <h1>Entrez Vos Informations De Voyage Pour {cityBooked}</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='text' required onChange={(e) => setFrom(e.target.value)} placeholder='De' />
                <input type='date' required onChange={(e) => setDate(e.target.value)} />
                <input type='number' required onChange={(e) => setPlaces(e.target.value)} placeholder='Combien De Personnes?' />
                <button>Soumettre</button>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default Booking