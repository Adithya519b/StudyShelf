import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import api from "../../services/api";

function FacultyRegister() {

    const navigate = useNavigate();

    const [faculty, setFaculty] = useState({

        name: "",

        facultyId: "",

        email: "",

        password: "",

        department: ""

    });

    const handleChange = (e) => {

        setFaculty({

            ...faculty,

            [e.target.name]: e.target.value

        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post("/faculty/register", faculty);

            alert("Faculty Registered Successfully");

            navigate("/faculty-login");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="login-container">

            <form
                className="login-card faculty-theme"
                onSubmit={handleRegister}
            >

                <h1>👨‍🏫 Faculty Registration</h1>

                <h2>CampusDocs</h2>

                <input
                    name="name"
                    placeholder="Faculty Name"
                    onChange={handleChange}
                    required
                />

                <input
                    name="facultyId"
                    placeholder="Faculty ID"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Faculty Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <select
                    name="department"
                    value={faculty.department}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select Department</option>

                    <option value="CSE">CSE</option>

                    <option value="ECE">ECE</option>

                    <option value="EEE">EEE</option>

                </select>

                <button type="submit">

                    Register

                </button>

                <p className="register-text">

                    Already have an account?{" "}

                    <Link to="/faculty-login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default FacultyRegister;