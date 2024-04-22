import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutImg from "../assets/images/about-banner.jpg";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import axios from "axios";

export default function About() {
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
    if (token) {
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
      <Navbar user={userAuthentication ? userAuthentication : ""} />
      <Hero cName="hero-mid" HeroImg={AboutImg} title="About" btnClass="hide" />
      <AboutUs />
      <Footer />
    </>
  );
}
