// import React from 'react';

import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../../../config.js";

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then((result) => {
            const loggedInUser = result.user;
            // console.log(loggedInUser);
            
            const savedUser = {name: loggedInUser.displayName, email: loggedInUser.email};

            fetch(`${API}/users`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(savedUser)
            })
            .then(res => res.json())
            .then(() => {
                navigate(from, {replace: true});
            })
        })
    }

    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center my-3">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;