import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './viewBookingStyles.css'

function ViewBooking() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const { id } = useParams()
  const [bookingDetail, setBookingDetail] = useState(null)
  const [profile, setProfile] = useState(null)
  const [user_token, setUser_token] = useState('');
  const [userAuthentication, setUserAuthentication] = useState(null);
  var http;
  http = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user_token}`,
      },
  });
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if(token){
      fetchBookingDetails();
      setUser_token(token);
    }
}, [user_token]);

  async function fetchBookingDetails() {
    if(user_token){
      const resp = await http.get('/bookings');
      setBookingDetail(resp.data);
      const foundBooking = resp.data.find(bookingDetail => bookingDetail.id == id);
      setProfile(foundBooking);
    }
  }

  async function handleRefuse(id) { 
    try {
        await http.post(`/mail/send/${profile.user.email}`, {
            subject: "Booking Refused",
            message: `Bonjour, ${profile.user.fullName}, nous espérons que ce message vous plaît. Malheureusement, votre réservation à ${profile.cityBooked} a été refusée. Nous comprenons que cela peut être décevant, et nous tenons à nous excuser pour tout inconvénient.\n\nNous vous invitons à nous contacter directement si vous avez des questions ou si vous avez besoin de plus d'informations sur cette décision, car les circonstances spécifiques de ce refus peuvent varier.\n\nNous nous efforçons d'offrir le meilleur service possible et nous espérons avoir la chance de vous accueillir à l'avenir. N'hésitez pas à nous contacter si vous avez des questions supplémentaires ou si nous pouvons vous aider de quelque manière que ce soit.\n\nJ'apprécie votre compréhension.\n\nSalutations,\n\nRihla.`,
        });
        await http.delete(`/bookings/delete/${id}`);   
        navigate(-1);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function handleAccept() {
    try {
        await http.post(`/mail/send/${profile.user.email}`, {
            subject: "Booking Accepted",
            message: `Bonjour, ${profile.user.fullName}, nous espérons que ce message vous plaît. Nous sommes ravis de vous informer que votre demande à ${profile.cityBooked} a été acceptée.\n\nNous sommes impatients de vous accueillir et de vous faire passer un séjour agréable. N'hésitez pas à nous informer à l'avance si vous avez des demandes spéciales ou des besoins particuliers afin que nous puissions les prendre en compte.\n\nPour confirmer votre réservation, nous vous appellerons plus tard. Nous restons disponibles pour répondre à toutes vos questions et vous aider à préparer votre séjour.\n\nSalutations,\n\nRihla.`,
        });
        navigate(-1);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}



  return (
    <div id='div-view-booking'>
      {profile ? (
        <>
          <h3 style={{"textAlign": "start"}}> {profile.user.fullName} </h3>
          <table id='table-admins' border="1px solid">
            <tr>
              <td id='booking-success-headers'>De</td>
              <td> {profile.startLocation} </td>
            </tr>
            <tr>
              <td id='booking-success-headers'>Date</td>
              <td>{profile.date}</td>
            </tr>
            <tr>
              <td id='booking-success-headers'>Numéro De Téléphone</td>
              <td> 0{profile.user.phoneNumber} </td>
            </tr>
            <tr>
              <td id='booking-success-headers'>Places</td>
              <td> {profile.places} </td>
            </tr>
          </table>
          <button onClick={() => handleRefuse(profile.id)} style={{"marginRight": "10px"}}>Refuser</button>
          <button onClick={() => handleAccept(profile.id)}>Accepter</button>
        </>
      ) : (
        <p>Chargement des détails du profil...</p>
      )}
    </div>
  )
}

export default ViewBooking