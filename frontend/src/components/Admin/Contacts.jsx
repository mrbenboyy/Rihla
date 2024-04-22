import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Contacts() {
    const [contacts, setContacts] = useState([])
    const [user_token, setUser_token] = useState('');
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
            fetchContacts();
        }
        
    }, [user_token]);


    async function fetchContacts() {
        if(user_token){
            const resp = await http.get("/contacts")
            setContacts(resp.data)
        }
    }

    async function handleDelete(id) {
        const resp = await http.delete(`/contacts/delete/${id}`);
        if (resp) {
            fetchContacts();
        } else {
            console.error("Error deleting user");
        }
    }

    return (
        <div>
            <h1>Derniers messages</h1>
            {
                contacts.length > 0
                    ?
                    <center>
                        <table style={{ marginTop: "15px" }} id='table-admins' border="1px solid">
                            <tr>
                                <th>Nom complet</th>
                                <th>Sujet</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                            <tbody>
                                {
                                    contacts.map((e, index) => {
                                        return (
                                            <tr>
                                                <td key={index}> {e.user.fullName} </td>
                                                <td key={index}> {e.subject} </td>
                                                <td key={index}> {e.message} </td>
                                                <td><button className='btn btn-danger' onClick={() => handleDelete(e.id)}>Supprimer</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </center>
                    : <h5>Aucun message à afficher</h5>
            }
        </div>
    )
}

export default Contacts