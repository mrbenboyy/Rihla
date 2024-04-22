import React, { useEffect, useState } from 'react'
import './ContactFromStyles.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ContactFrom() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
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
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    if(userAuthentication){
        const contact = {"subject": subject, "message": message,"user":userAuthentication};
      await http.post('/contacts/add', contact);
      navigate('/contact-success');
      localStorage.setItem("contactName",  userAuthentication.fullName);
    }else{
      navigate("/login")
    }
  }

  return (
    <div className='form-container'>
        <h1>Envoyez-nous un message !</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input placeholder='Sujet' onChange={(e) => {setSubject(e.target.value)}} />
            <textarea placeholder='Message' required rows='4' onChange={(e) => {setMessage(e.target.value)}}></textarea>
            <button>Envoyer Message</button>
        </form>
    </div>
  )
}

export default ContactFrom