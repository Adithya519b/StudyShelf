import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaBookOpen,
    FaEnvelope,
    FaLock,
    FaArrowLeft,
    FaArrowRight
} from "react-icons/fa";
import "../styles/login.css";
import axios from "axios";

function StudentLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/api/students/login",
                {
                    email,
                    password
                }
            );

            alert("Login Successful");

            // Save logged-in student
            localStorage.setItem(
                "student",
                JSON.stringify(response.data)
            );

            navigate("/student-dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        }
    };

    return (

        <div className="login-container">

            {/* Background decoration */}
            <div className="login-glow login-glow-one"></div>
            <div className="login-glow login-glow-two"></div>

            <form
                className="login-card"
                onSubmit={handleLogin}
            >

                {/* Brand */}
                <div className="login-brand">

                    <div className="login-brand-icon">
                        <FaBookOpen />
                    </div>

                    <span>
                        Campus<span>Docs</span>
                    </span>

                </div>


                {/* Heading */}
                <div className="login-heading">

                    <h1>Welcome back!</h1>

                    <p>
                        Login to access your academic resources.
                    </p>

                </div>


                {/* Email */}
                <div className="input-group">

                    <label htmlFor="student-email">
                        Student Email
                    </label>

                    <div className="input-wrapper">

                        <FaEnvelope className="input-icon" />

                        <input
                            id="student-email"
                            type="email"
                            placeholder="Enter your college email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                </div>


                {/* Password */}
                <div className="input-group">

                    <label htmlFor="student-password">
                        Password
                    </label>

                    <div className="input-wrapper">

                        <FaLock className="input-icon" />

                        <input
                            id="student-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                </div>


                {/* Login Button */}
                <button
                    type="submit"
                    className="login-submit"
                >

                    <span>Login</span>

                    <FaArrowRight />

                </button>


                {/* Register */}
                <p className="register-text">

                    New Student?

                    <Link to="/student-register">
                        Create Account
                    </Link>

                </p>


                {/* Back */}
                <Link
                    to="/"
                    className="back-home"
                >
                    <FaArrowLeft />
                    Back to Home
                </Link>

            </form>

        </div>

    );
}

export default StudentLogin;