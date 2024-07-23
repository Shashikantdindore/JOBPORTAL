import React, { useEffect, useContext } from 'react';
import './App.css';
import { Context } from './main';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Home from './Components/Home/Home';
import Jobs from './Components/Job/Jobs';
import JobDetail from './Components/Job/JobDetail';
import MyJobs from './Components/Job/MyJobs';
import PostJob from './Components/Job/PostJob';
import Application from './Components/Application/Application';
import MyApplication from './Components/Application/MyApplication';
import NotFound from './Components/NotFound/NotFound';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getUser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getAll" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplication />} />
        <Route path="*" element={<NotFound />} />
        
        
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
