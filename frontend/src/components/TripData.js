import React from 'react'
import "./TripStyles.css"
import { Link } from 'react-router-dom'

function TripData(props) {
  return (
    <div className='t-card'>
      <Link id='city' to={props.link}>
        <div className='t-image'>
          <img src={props.image} alt='image' />
        </div>
        <h4> {props.heading} </h4>
      </Link>
    </div>
  )
}

export default TripData