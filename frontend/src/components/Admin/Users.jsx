import React, { useEffect, useState } from 'react'
import axios from 'axios'

function User() {
    const [admins, setAdmins] = useState([])
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user_token, setUser_token] = useState('');
    const [id, setID] = useState(null)
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
            fetchAdmins();
        }
    }, [user_token]);

    async function fetchAdmins() {
        if (user_token) {
            const resp = await http.get("/users")
            setAdmins(resp.data)
        }
    }

    async function handleDelete(id) {
        const resp = await http.delete(`/users/delete/${id}`);
        if (resp) {
            fetchAdmins();
        } else {
            console.error("Error deleting user");
        }
    }

    function handleReset() {
        setFullName("")
        setEmail("")
        setPassword("")
        setID(null)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (id) {
            const updatedAdminData = {
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                
            }
            const resp = await http.post(`/users/update/${id}`, updatedAdminData);
            if (resp) {
                fetchAdmins();
            } else {
                console.error("Error updating user");
            }
        } else {

            const newAdmins = {
                id: null,
                fullName: fullName,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                role: "admin"
            }
            const resp = await http.post(`/users/add`, newAdmins);
            if (resp) {
                fetchAdmins();
            } else {
                console.error("Error adding user");
            }
        }
        handleReset()
    }

    async function handleEdit(id) {
        const updatedAdmin = admins.find((item) => item.id === id)
        setFullName(updatedAdmin.fullName)
        setEmail(updatedAdmin.email)
        setPhoneNumber(updatedAdmin.phoneNumber)
        setID(id)
    }

    return (
        <div>
            <form id='form' onSubmit={(e) => handleSubmit(e)}>
                <table id='tableForm' className='table table-sm'>
                    <tr className='table-success' >
                        <td id='labels'>Nom Complet: </td>
                        <td><input className='form-control' required placeholder='John Doe' style={{ width: "200px" }} type='text' onChange={(e) => setFullName(e.target.value)} value={fullName} /></td>
                    </tr>
                    <tr className='table-success'>
                        <td id='labels'>Phone Number: </td>
                        <td><input className='form-control'required placeholder='XX XX XX XX' style={{ width: "200px" }} type='number' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} /></td>
                    </tr>
                    <tr className='table-success'>
                        <td id='labels'>Email: </td>
                        <td><input className='form-control'required placeholder='johndoe@gmail.com' style={{ width: "200px" }} type='email' onChange={(e) => setEmail(e.target.value)} value={email} /></td>
                    </tr>
                    {
                        id !== null ?
                        null
                        :
                        <tr className='table-success'>
                        <td id='labels'>Password: </td>
                        <td><input className='form-control'required placeholder='********' style={{ width: "200px" }} type='password' onChange={(e) => setPassword(e.target.value)} /></td>
                    </tr>
                    }
                </table>
                <div style={{ marginLeft: "-450px", "marginTop": "10px" }}>
                    <button type='submit' style={{ "marginRight": "10px" }}>{id !== null ? "Modifier" : "Envoyer"}</button>
                    <button type='reset' onClick={() => handleReset()}>Annuler</button>
                </div>
            </form><br />
            <center>
                {
                    admins.length > 0
                        ?
                        <table id='table-admins' border="1px solid">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom Complet</th>
                                    <th>Email</th>
                                    <th>Phone number</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admins.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td> {index + 1} </td>
                                                <td> {item.fullName} </td>
                                                <td> {item.email} </td>
                                                <td> {"0"+item.phoneNumber} </td>
                                                <td> {item.role} </td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)} style={{ "marginRight": "10px" }}>Modifier</button>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Supprimer</button> </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <p>Pas de données disponibles...</p>
                }
            </center>
        </div>
    )
}

export default User