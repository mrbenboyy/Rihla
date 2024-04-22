import React, { useEffect } from 'react'
import './FooterStyles.css'
import { Link } from 'react-router-dom'

function Footer() {
    const goTop = () => {
            window.scrollTo(0, 0);
    }
    return (
        <div className='footer'>
            <div className='top'>
                <div>
                    <Link id='footer-logo' onClick={() => goTop()} to="/"><h1>Rihla</h1></Link>
                    <p>Choisissez votre destination préférée.</p>
                </div>
                <div>
                    <a href='https://www.facebook.com' target='blank'>
                        <i className='fa-brands fa-facebook-square'></i>
                    </a>
                    <a href='https://www.instagram.com' target='blank'>
                        <i className='fa-brands fa-instagram-square'></i>
                    </a>
                    <a href='https://www.whatsapp.com' target='blank'>
                        <i className='fa-brands fa-whatsapp-square'></i>
                    </a>
                    <a href='https://www.twitter.com' target='blank'>
                        <i className='fa-brands fa-twitter-square'></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;