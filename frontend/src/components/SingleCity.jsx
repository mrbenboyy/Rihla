import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Footer from './Footer'
import './AboutUsStyles.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function SingleCity() {
    const { id } = useParams()
    const [cities, setCities] = useState(null)
    const navigate = useNavigate();
    const [city, setCity] = useState(null)

    
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
    fetchCities();
    if (token) {
      switchDashboard();
      setUser_token(token);
    }
  }, [user_token]);
  async function switchDashboard() {
    const resp = await http.get("/users/user-authentication");
    setUserAuthentication(resp.data);
  }
   

    async function fetchCities() {
        const resp = await http.get("/cities");
        setCities(resp.data);
        const foundCity = resp.data.find(city => city.id == id);
        setCity(foundCity);
        console.log( foundCity)
    }

    const handleBooking = () => {
        if(user_token){
            const cityBooked = city.title
            localStorage.setItem("cityBooked", cityBooked)
            navigate("/booking");
        }else{
            navigate("/login");
        }
    }

    return (
        <div>
        <Navbar  user = {userAuthentication?userAuthentication:""}/>
            <div>
                {city ? (
                    <>
                    <Hero
                        cName="hero-mid"
                        HeroImg={`http://localhost:8080/${city.imageFile}`}
                        title={city.title}
                        btnClass="hide"
                    />
                        <p className='about-container' id='city-description'>{city.description}</p>
                        <center><iframe src={city.map} width="500" height="250" style={{"border":"0;"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></center>
                    </>
                ) : (
                    <p>Loading city details...</p>
                )}
            </div>
            <button className='booking-button' onClick={() => handleBooking()}>Book Now</button>
            <Footer />
        </div>
    )
}

export default SingleCity