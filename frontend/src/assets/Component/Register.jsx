import { useState } from "react";
import "../Css/Login.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const registerUser = async () => {
        setLoading(true);
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "name": document.getElementById("username").value,
                "email": document.getElementById("uemail").value,
                "password": document.getElementById("password").value
            });

            let response = await fetch("http://localhost:3000/register", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            const data = await response.json();
            if (data.code == 201) {
                navigate("/");
            } else {
                setError(data.msg);
                console.log(data.msg);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Email</label>
                        <input type="email" id="uemail" name="uemail" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="input-group">
                        <button type="button" className={loading ? "loading" : ""} onClick={registerUser}>Register</button>
                    </div>
                    <span className="link">Already have na account? <Link to="/login">Sign In Here</Link></span>
                </form>
            </div>
        </div>

    )
}
