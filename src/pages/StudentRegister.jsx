import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaBookOpen,
    FaUser,
    FaIdCard,
    FaEnvelope,
    FaLock,
    FaGraduationCap,
    FaLayerGroup,
    FaArrowRight
} from "react-icons/fa";
import api from "../services/api";
import "../styles/login.css";

function StudentRegister() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({

        name: "",
        rollNo: "",
        email: "",
        password: "",
        department: "",
        semester: ""

    });

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/students/register",
                student
            );

            alert("Registration Successful");

            navigate("/student-login");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="login-container register-container">

            {/* Background decoration */}
            <div className="login-glow login-glow-one"></div>
            <div className="login-glow login-glow-two"></div>


            <form
                className="login-card register-card"
                onSubmit={handleRegister}
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

                    <h1>Create your account</h1>

                    <p>
                        Join CampusDocs and access your academic resources.
                    </p>

                </div>


                {/* Full Name */}
                <div className="input-group">

                    <label htmlFor="student-name">
                        Full Name
                    </label>

                    <div className="input-wrapper">

                        <FaUser className="input-icon" />

                        <input
                            id="student-name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={student.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>


                {/* Roll Number */}
                <div className="input-group">

                    <label htmlFor="student-roll">
                        Roll Number
                    </label>

                    <div className="input-wrapper">

                        <FaIdCard className="input-icon" />

                        <input
                            id="student-roll"
                            name="rollNo"
                            type="text"
                            placeholder="Enter your roll number"
                            value={student.rollNo}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>


                {/* Email */}
                <div className="input-group">

                    <label htmlFor="student-register-email">
                        Email Address
                    </label>

                    <div className="input-wrapper">

                        <FaEnvelope className="input-icon" />

                        <input
                            id="student-register-email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={student.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>


                {/* Password */}
                <div className="input-group">

                    <label htmlFor="student-register-password">
                        Password
                    </label>

                    <div className="input-wrapper">

                        <FaLock className="input-icon" />

                        <input
                            id="student-register-password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={student.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>


                {/* Department + Semester */}
                <div className="register-row">

                    {/* Department */}
                    <div className="input-group">

                        <label htmlFor="student-department">
                            Department
                        </label>

                        <div className="input-wrapper">

                            <FaGraduationCap className="input-icon" />

                            <select
                                id="student-department"
                                name="department"
                                value={student.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Department
                                </option>

                                <option value="CSE">
                                    CSE
                                </option>

                                <option value="ECE">
                                    ECE
                                </option>

                                <option value="EEE">
                                    EEE
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* Semester */}
                    <div className="input-group">

                        <label htmlFor="student-semester">
                            Semester
                        </label>

                        <div className="input-wrapper">

                            <FaLayerGroup className="input-icon" />

                            <select
                                id="student-semester"
                                name="semester"
                                value={student.semester}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Semester
                                </option>

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* Register Button */}
                <button
                    type="submit"
                    className="login-submit"
                >

                    <span>Create Account</span>

                    <FaArrowRight />

                </button>


                {/* Login */}
                <p className="register-text">

                    Already have an account?

                    <Link to="/student-login">
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );
}

export default StudentRegister;