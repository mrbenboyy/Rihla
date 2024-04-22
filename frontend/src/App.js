import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Service from './routes/Service';
import Login from './components/Login';
import Booking from './components/Booking';
import BookingSuccess from './components/BookingSuccess';
import Dashboard from './components/Admin/Dashboard';
import WelcomeAdmin from './components/Admin/WelcomeAdmin';
import Users from './components/Admin/Users';
import Cities from './components/Admin/Cities';
import Bookings from './components/Admin/Bookings';
import SingleCity from './components/SingleCity';
import ViewBooking from './components/Admin/ViewBooking';
import ContactSuccess from './components/ContactSuccess';
import WelcomeUser from './components/UserDash/WelcomeUser';
import UserDashboard from './components/UserDash/UserDashboard';
import SignUp from './components/SignUp';
import Contacts from './components/Admin/Contacts';
import UserBookings from './components/UserDash/UserBookings';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const[user_token,setUser_token]=useState('');
  const [userAuthentication, setUserAuthentication] = useState();
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
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/contact-success' element={<ContactSuccess />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/booking' element={<Booking />} />
        <Route path='/booking-success' element={<BookingSuccess />} />
        <Route path='/city/:id' element={<SingleCity />} />
        <Route path='/dashboard' element={userAuthentication?userAuthentication.role==="admin"?<Dashboard />:<Navigate to="/"/>:<Navigate to="/"/>}>
              <Route index element={<WelcomeAdmin />} />
              <Route path='admins' element={<Users />} />
              <Route path='cities' element={<Cities />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='booking/:id' element={<ViewBooking />} />
              <Route path='contacts' element={<Contacts />} />
            </Route>
       <Route path='/user-dashboard' element = {userAuthentication?userAuthentication.role==="user"?<UserDashboard />:<Navigate to="/"/>:<Navigate to="/"/>} >
          <Route index element={<WelcomeUser />} />
          <Route path='bookings' element={<UserBookings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
