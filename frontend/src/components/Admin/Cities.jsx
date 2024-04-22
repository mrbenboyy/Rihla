import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './citiesStyles.css'

function Cities() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cities, setCities] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [map, setMap] = useState('')
  const [cityImage, setCityImage] = useState(null);
  const [id, setID] = useState(null)
  const[user_token,setUser_token]=useState('');
 
  
  var http;
      http = axios.create({
          baseURL: "http://localhost:8080",
          headers:{ "Content-Type":"application/json",
          'Authorization':`Bearer ${user_token}`,
          },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if(token){
      fetchCities()
      setUser_token(token);
    }
}, [user_token]);

 

  async function fetchCities() {
    const resp = await http.get("/cities");
    console.log("Response from server:", resp.data);
    setCities(resp.data);
  }

  // async function handleDelete(id){
  //     const resp = await http.delete(`http://localhost:5000/cities/${id}`)
  //     console.log(resp)
  //     setCities(resp.data)
  // }

  async function handleDelete(id) {
    try {
      await http.delete(`/cities/delete/${id}`);
      // Fetch updated list of cities after deletion
      fetchCities();
    } catch (error) {
      console.error("Failed to delete city:", error);
    }
  }


  function handleReset() {
    setTitle("")
    setDescription("")
    setMap("")
    setCityImage(null)
    setID(null)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      // Update existing city
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("map", map);
      formData.append("image_file", cityImage);

      try {
        const resp = await http.post(`/cities/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setCities(resp.data);
        fetchCities();
        handleReset();
      } catch (error) {
        console.error("Failed to update city:", error);
      }
    } else {
      // Add new city
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("map", map);
      formData.append("image_file", cityImage);

      try {
        await http.post(`/cities/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data" // Set the correct content type
          }
        });
      } catch (error) {
        console.error("Failed to add city:", error);
      }
      fetchCities();
    }

    handleReset();
  }




  async function handleEdit(id) {
    const updatedCity = cities.find((item) => item.id === id)
    setTitle(updatedCity.title)
    setDescription(updatedCity.description)
    setMap(updatedCity.map)
    setCityImage(updatedCity.cityImage)
    setID(id)
  }

  return (
    <div>
      <form id='form' encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
        <table id='tableForm' className='table table-sm'>
          <tr className='table-success' >
            <td id='texts'>Nom De Ville: </td>
            <td><input className='form-control' placeholder='Casablanca' style={{ width: "200px" }} type='text' onChange={(e) => setTitle(e.target.value)} value={title} /></td>
          </tr>
          <tr className='table-success'>
            <td id='texts'>Description: </td>
            <td>
              <textarea
                className='form-control' placeholder='Description...'
                style={{ width: "200px", height: "100px" }}
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </td>
          </tr>
          <tr className='table-success'>
            <td id='texts'>Map: </td>
            <td><input className='form-control' placeholder='https://www.google.com/maps/embed?' style={{ width: "200px" }} type='text' onChange={(e) => setMap(e.target.value)} value={map} /></td>
          </tr>
          <tr className='table-success'>
            <td id='texts'>Image: </td>
            <td><label htmlFor='image-input'>cliquer pour choisir</label><input id='image-input' className='form-control' style={{ width: "200px" }} type='file' onChange={(e) => setCityImage(e.target.files[0])} /></td>
          </tr>
        </table>
        <div style={{ marginLeft: "-450px" }}>
          <button type='submit' style={{ "marginRight": "10px", "marginTop": "10px" }}>{id !== null ? "Modifier" : "Envoyer"}</button>
          <button type='reset' onClick={() => handleReset()}>Annuler</button>
        </div>
      </form><br />
      <table id='table-admins' border="1px solid">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom De Ville</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cities) && cities.map((item, index) => {
            return (
              <tr key={item.id}>
                <td> {index + 1} </td>
                <td> {item.title} </td>
                <td id='description'> {item.description} </td>
                <td> <img width={50} height={50} src={"http://localhost:8080/" + item.imageFile} /> </td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Modifier</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Supprimer</button> </td>
              </tr>
            )
          })}
        </tbody>

      </table><br />
    </div>
  )
}

export default Cities