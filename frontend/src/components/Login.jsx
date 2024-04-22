import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutImg from '../assets/images/Hassan2.jpg';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
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
    const navigate = useNavigate()
async function handleSubmit(e){
    e.preventDefault()
    const user = {"email": email, "password": password}
    const resp = await http.post(`/users/login`, user)
    if(resp.data.token){
        const token = resp.data.token
        localStorage.setItem("token", token);
        if(resp.data.message==="admin"){
            navigate('/');
            window.location.reload(false); 
        }else {
           // navigate('/user-dashboard');
           navigate("/");
           window.location.reload(false); 
        }
    }else{
        setError(resp.data.message);
    }

}

    return (
        <div>
            <Navbar user = {userAuthentication?userAuthentication:""}/>
            <Hero
                cName="hero-mid"
                HeroImg={AboutImg}
                title="Login"
                btnClass="hide"
            />
            <div className='form-container'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Mot De Passe' />
                    <span>{error}</span>
                    <button>Login</button>
                    <p style={{color: "#000000"}}>Vous n'avez pas de compte? <Link to="/sign-up">Inscrivez vous</Link></p>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Login