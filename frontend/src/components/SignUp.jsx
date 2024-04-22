import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutImg from '../assets/images/Hassan2.jpg';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const http = axios.create({
        baseURL: "http://localhost:8080",
        headers: {"Content-Type": "application/json"}
    })
    const navigate = useNavigate()
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    async function handleSubmit(e){
        e.preventDefault()
        const newAdmins = {
            id:null,
            fullName: fullName,
            email: email,
            password: password,
          phoneNumber:phoneNumber,
          role:"user"
        }
        const resp = await http.post(`/users/add`, newAdmins);

        navigate('/login');
    }

    return (
        <div>
            <Navbar />
            <Hero
                cName="hero-mid"
                HeroImg={AboutImg}
                title="Login"
                btnClass="hide"
            />
            <div className='form-container'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' required onChange={(e) => setFullName(e.target.value)} placeholder='Nom complet' />
                    <input type='number'required onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Numéro de télephone' />
                    <input type='email'required onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <input type='password'required onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' />
                    <button>Sign up</button>
                    <p style={{ color: "#000000" }}>Vous avez déja un compte? <Link to="/login">Connectez-vous</Link></p>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp