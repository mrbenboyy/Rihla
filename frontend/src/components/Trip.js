import React, { useEffect, useState } from 'react'
import "./TripStyles.css"
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function Trip() {
    const [cities, setCities] = useState([]);
    const [search, setSearch] = useState("");
    const http = axios.create({
        baseURL: "http://localhost:8080",
        headers: { "Content-Type": "application/json" },
    });

    const location = useLocation();

    useEffect(() => {
        fetchCities();
    }, []);

    async function fetchCities() {
        const resp = await http.get("/cities");
        setCities(resp.data);
    }

    return (
        <div className='trip'>
            <h1>Voyages Récents</h1>
            {location.pathname !== '/' && (
                <input type="text" id='search' onChange={(e) => setSearch(e.target.value)} placeholder='rechercher une ville...' />
            )}
            <div className='tripcard'>
                {cities.filter((item) => {
                    if (search === "") {
                        return true;
                    } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                    }
                }).map((item) => {
                    return (
                        <div className='t-card'>
                            <Link id="city" to={`/city/${item.id}`}>
                                <div className='t-image'>
                                    <img src={"http://localhost:8080/" + item.imageFile} alt="image" />
                                </div>
                                <h4> {item.title} </h4>
                                <p id='description-city'> {item.description} </p>
                            </Link>
                        </div>
                    )
                })}
                {/* Condition to display message when there are no search results */}
                {cities.filter((item) => {
                    if (search === "") {
                        return true;
                    } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                    }
                }).length === 0 && (
                        <p style={{margin: "auto", color:"red"}} >No results found</p>
                    )}
            </div>
        </div>

    )
}

export default Trip