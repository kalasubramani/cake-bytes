import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "./Register.css";



const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      firstname,
      lastname,
      username,
      password,
      is_admin: false
    };
    try {
      const response = await axios.post(
        "/api/users/register",
        user
      );

      navigate("/completeRegistration");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="registerform">
        <label>
          First name:
          <input
            type="text"
            value={firstname}
            maxLength={12}
            minLength={3}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastname}
            maxLength={12}
            minLength={3}
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            maxLength={25}
            minLength={6}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
           
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            maxLength={11}
            minLength={6}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
          />
        </label>
        <button type="submit" className="signUpButton">
         Sign Up
        </button>
      </form>
      {
      error ? <p>{error}</p> : null
      }
    </div>
  );
};

export default Register;
