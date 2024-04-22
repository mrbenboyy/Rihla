import React, { useState, useEffect } from 'react';
import './NavbarStyles.css';
import { MenuItems } from './MenuItems';
import { Link, useNavigate } from 'react-router-dom'; 

const Navbar = (props) => {
    const [clicked, setClicked] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleClick = () => {
        setClicked(!clicked);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.reload(false);
    };

    useEffect(() => {
        // Update the state when the token changes
        const updatedToken = localStorage.getItem("token");
        if (token !== updatedToken) {
          
            setToken(updatedToken);
        }
    }, [token]);

  
    return (
        <div>
            <nav className='NavbarItems'>
                <Link id='navbar-logo' to='/'><h1>Rihla</h1></Link>
                <div className='menu-icons' onClick={handleClick}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => (
                        <li key={index}>
                            <Link className={item.cName} to={item.url}>
                                <i className={item.icon}></i>{item.title}
                            </Link>
                        </li>
                    ))}
                    {props.user ? (
                        props.user.role === "admin"?<li>
                        <Link className='nav-links' to="/dashboard">
                            <i className='fas fa-user-cog'></i>Admin Dashboard
                        </Link>
                    </li>:<li>
                            <Link className='nav-links' to="/user-dashboard">
                                <i className='fas fa-user-cog'></i>User Dashboard
                            </Link>
                        </li>
                    ) : 
                  null
                    }
                    {token !== null ? (
                        <Link to="/" onClick={logout}>
                            <button onClick={logout}>Logout</button>
                        </Link>
                    ) : (
                        <Link to='/login'>
                            <button>Login</button>
                        </Link>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
