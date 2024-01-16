import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";


const ProfileSettings = ({user, setUser}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');   

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
          user_id: user.id,  
          firstName,
          lastName,
          userName,
          password,
          is_admin: false,
          is_vip: false
        }

      const updateUser = async (newUser,setUser)=>{
            await api.updateProfile(newUser,setUser);
        }
         updateUser(newUser,setUser);

         navigate("/user-profile")
      };

return (
    <div>
        <h3>Update Settings</h3>
        <form onSubmit={handleSubmit} className="profileform">
            <label>
                First Name:
                <input
                 type='text'
                 value={firstName}
                 maxLength={13}
                 minLength={3}
                 onChange={(e) => {
                    setFirstName(e.target.value);
                }}
                />
            </label>
            <label>
                Last Name:
                <input
                 type="text" 
                 value={lastName}
                 maxLength={13}
                 minLength={3}
                 onChange={(e) => {
                    setLastName(e.target.value);
                }}
                />
            </label>
            <label>
            Username:
            <input
             type="text"
             value={userName}
             maxLength={25}
             minLength={6}
             onChange={(event) => {
                setUserName(event.target.value);
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
        <button type="submit" className="updateButton">
        Update
        </button>

        </form>





    </div>
)

}

export default ProfileSettings