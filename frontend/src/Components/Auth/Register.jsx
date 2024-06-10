import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { FaPencilAlt, FaPhone, FaRegUser } from 'react-icons/fa';
import { LiaEnvelopeSolid } from "react-icons/lia";
import { RiLock2Fill } from 'react-icons/ri';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");


  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/user/register",
        { name, email, password, phone, role },
        {
          withCredentials: true, headers: {
            "Content-Type": "application/json"
          },
        }
      );

      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
      setUser(data.user);
    } catch (error) {

      toast.error(error.response.data.message);
      console.log(error)





    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />
  }

  return (
    <>

      <div className="register">

        <div className="authPage">
          <div className="container">
            <div className="header">
              <img src="/logoNav.png" alt="logo" />

              <h3>Create Account</h3>
            </div>
            <form >
              <div className="inputTag">
                <label>Register As</label>
                <div>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="JobSeeker">Job Seeker</option>
                  </select>


                </div>
              </div>

              <div className="inputTag">
                <label>Name</label>
                <div>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />


                </div>
              </div>

              <div className="inputTag">
                <label>Email</label>
                <div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />


                </div>
              </div>

              <div className="inputTag">
                <label>Phone</label>
                <div>
                  <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='phone' />


                </div>
              </div>

              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />


                </div>
              </div>

              <button onClick={handleRegister} type='submit'>Register</button>



             


            </form>
             <div style={{textAlign : 'center' , marginBottom : '10px'}}>
                Already Registered?<Link to={"/login"}> Login Now</Link>
              </div>

          </div>


        </div>


      </div>

    </>
  )
}

export default Register