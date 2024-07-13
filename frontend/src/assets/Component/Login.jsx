import { useState } from "react";
import "../Css/Login.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginUser = async () => {
        setLoading(true);
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "email": document.getElementById("uemail").value,
                "password": document.getElementById("password").value
            });

            let response = await fetch("http://localhost:3000/login", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            const data = await response.json();
            if (data.code == 200) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
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
            <div className="sign-in-form">
                <h2>Sign In</h2>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className="input-group">
                        <label htmlFor="uemail">Email</label>
                        <input type="text" id="uemail" name="uemail" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                </form>
                <div className="input-group">
                    <button className={loading ? "loading" : ""} onClick={loginUser} onTouchEnd={loginUser} type="button">Sign In</button>
                </div>
                <span className="link">Don&#39;t have account? <Link to="/register"> Register here</Link></span>
            </div>
        </div>

    )
}
