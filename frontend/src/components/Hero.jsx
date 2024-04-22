import React from 'react';
import "./HeroSyles.css";

export default function Hero(props) {
  return (
    <div className={props.cName}>
        
      <img src={props.HeroImg} alt="HeroImg" />
      <div className="hero-text">
          <p> {props.text} </p>
          <p> {props.slogan} </p>
      </div>
    </div>
  )
}
