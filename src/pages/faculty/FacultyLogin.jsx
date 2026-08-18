import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import api from "../../services/api";
function FacultyLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post(
            "/faculty/login",
            {
                email,
                password
            }
        );

        alert("Login Successful");

        // Save logged-in faculty
        localStorage.setItem(
            "faculty",
            JSON.stringify(response.data)
        );

        navigate("/faculty-dashboard");

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Invalid Email or Password"
        );

    }

};

    return (
        <div className="login-container">

            <form className="login-card faculty-theme" onSubmit={handleLogin}>

                <h1>👨‍🏫 Faculty Portal</h1>

                <h2>CampusDocs</h2>

                <input
                    type="email"
                    placeholder="Faculty Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>
                <p className="register-text">

                    New Faculty?{" "}

                    <Link to="/faculty-register">

                        Create Account

                    </Link>

                </p>

                <Link to="/">
                    ← Back to Home
                </Link>

            </form>

        </div>
    );
}

export default FacultyLogin;