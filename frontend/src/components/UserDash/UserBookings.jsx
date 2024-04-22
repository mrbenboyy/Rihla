import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const [id, setId] = useState(null);
    const [startLocation, setStartLocation] = useState("");
    const [cityBooked, setCityBooked] = useState("");
    const [date, setDate] = useState(null);
    const [places, setPlaces] = useState();
    const [user_token, setUser_token] = useState('');
    const [userAuthentication, setUserAuthentication] = useState(null);
    var http;
    http = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user_token}`,
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token");
        if (token) {
            setUser_token(token);
            userInfo();
        }
    }, [user_token]);


    useEffect(() => {
        if (userAuthentication) {
            fetchBookings();
        }
    }, [userAuthentication]);

    async function userInfo() {
        try {
            const resp = await http.get("/users/user-authentication");
            setUserAuthentication(resp.data);
        } catch (error) {
            console.error("Error fetching user authentication:", error);
        }
    }

    async function fetchBookings() {
        try {
            const resp = await http.get(`/bookings/user/${userAuthentication.id}`);
            setBookings(resp.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    }

    async function handleDelete(id) {
        try {
            const resp = await http.delete(`/bookings/delete/${id}`);
            if (resp.status === 200) {
                fetchBookings();
            } else {
                console.error("Error deleting booking");
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    }

    const handleEdit = (id) => {
        const foundBooking = bookings.find((e) => e.id === id)
        setStartLocation(foundBooking.startLocation)
        setDate(foundBooking.date)
        setCityBooked(foundBooking.cityBooked)
        setPlaces(foundBooking.places)
        setId(id);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const newBooking = {
            startLocation: startLocation,
            date: date,
            cityBooked: cityBooked,
            places: places
        }
        try {
            const resp = await http.post(`/bookings/update/${id}/${userAuthentication.id}`, newBooking);
            if (resp) {
                fetchBookings();
            } else {
                console.error("Error updating the booking")
            }
        } catch (error) {
            console.error("Error updating the booking:", error);
        }
        handleReset();
    }

    const handleReset = () => {
        setId(null);
        setStartLocation("");
        setDate(null);
        setPlaces(null);
        setCityBooked("");
    }

    return (
        <div>
            {
                id !== null
                    ?
                    <form id='form' onSubmit={(e) => handleUpdate(e)}>
                        <table>
                            <tr>
                                <td>Ville réservée:</td>
                                <td><input className='form-control' style={{ width: "200px" }} type="text" onChange={(e) => setCityBooked(e.target.value)} value={cityBooked} /></td>
                            </tr>
                            <tr>
                                <td>Ville départ:</td>
                                <td><input className='form-control' style={{ width: "200px" }} type="text" onChange={(e) => setStartLocation(e.target.value)} value={startLocation} /></td>
                            </tr>
                            <tr>
                                <td>Places:</td>
                                <td><input className='form-control' style={{ width: "200px" }} type="number" onChange={(e) => setPlaces(e.target.value)} value={places} /></td>
                            </tr>
                            <tr>
                                <td>Date:</td>
                                <td><input className='form-control' style={{ width: "200px" }} type="date" onChange={(e) => setDate(e.target.value)} value={date} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button>Modifier</button>
                                    <button onClick={() => handleReset()} style={{ marginLeft: "5px" }}>Annuler</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    : null
            }
            {
                bookings.length > 0
                    ?
                    <table id='table-admins' border="1px solid">
                        <thead>
                            <tr>
                                <th>Ville réservée</th>
                                <th>Ville départ</th>
                                <th>Places</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {e.cityBooked} </td>
                                            <td> {e.startLocation} </td>
                                            <td> {e.places} </td>
                                            <td> {e.date} </td>
                                            <td>
                                                <button onClick={() => handleEdit(e.id)}>Modifier</button>
                                                <button style={{ marginLeft: "5px" }} onClick={() => handleDelete(e.id)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    : "No data available"
            }
        </div>
    );
}

export default UserBookings;
