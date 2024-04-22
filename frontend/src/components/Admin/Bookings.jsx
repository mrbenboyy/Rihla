import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Bookings() {
  const[user_token,setUser_token]=useState('');
  const[bookings,setBookings]=useState('');
  
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
      fechBookings()
      setUser_token(token);
    }
}, [user_token]);
  const navigate = useNavigate()
  const accepted = localStorage.getItem("accepted")

  async function fechBookings() {
    if(user_token){
      const resp = await http.get("/bookings")
      console.log(resp.data)
      setBookings(resp.data)
    }
   
  }

  const handleView = (id) => {
    navigate(`/dashboard/booking/${id}`)
  }

  return (
    <div>
      {
        bookings.length > 0 ?
          <table id='table-admins' border="1px solid">
            <thead>
              <tr>
                <th>Email</th>
                <th>À</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                bookings.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td> {item.user.email} </td>
                      <td> {item.cityBooked} </td>
                      <td><button onClick={() => handleView(item.id)}>View</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          :
          <p>Pas de données disponibles...</p>
      }

    </div>
  )
}

export default Bookings