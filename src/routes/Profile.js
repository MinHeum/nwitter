import React, { useState } from "react";
import { authService } from "fBase";
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }
    
    return (
        <div className="container">
            <div style={{padding: 3,}}>
                Change Profile Name
            </div>
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                    autoFocus
                    className="formInput"
                />
                <input
                    type="submit"
                    value ="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <button onClick={onLogOutClick} className="formBtn cancelBtn logout">
                Log Out
            </button>
        </div>
    );
};

export default Profile;
