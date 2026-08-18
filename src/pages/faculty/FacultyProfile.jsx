import { useEffect, useState } from "react";
import {
    FaUserCircle,
    FaBook,
    FaUpload,
    FaEdit,
    FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/facultyProfile.css";
import api from "../../services/api";

function FacultyProfile() {

    const navigate = useNavigate();

    const [faculty, setFaculty] = useState(null);

    const [uploadCount, setUploadCount] = useState(0);

    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: ""
    });


    // ==============================
    // Load Faculty
    // ==============================

    useEffect(() => {

        const loggedFaculty = JSON.parse(
            localStorage.getItem("faculty")
        );

        if (!loggedFaculty) {

            navigate("/faculty-login");

            return;
        }

        setFaculty(loggedFaculty);

        setFormData({

            name: loggedFaculty.name,

            email: loggedFaculty.email,

            department: loggedFaculty.department

        });

        fetchUploadCount(loggedFaculty.id);

    }, [navigate]);


    // ==============================
    // Fetch Faculty Upload Count
    // ==============================

    const fetchUploadCount = async (facultyId) => {

        try {

            const response = await api.get(
                `/pdfs/faculty/${facultyId}/count`
            );

            setUploadCount(response.data);

        } catch (error) {

            console.error(
                "Failed to load upload count:",
                error
            );

            setUploadCount(0);
        }

    };


    // ==============================
    // Logout
    // ==============================

    const handleLogout = () => {

        localStorage.removeItem("faculty");

        navigate("/faculty-login");

    };


    // ==============================
    // Edit Profile
    // ==============================

    const handleEdit = () => {

        setEditing(true);

    };


    // ==============================
    // Handle Input Change
    // ==============================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // ==============================
    // Update Faculty
    // ==============================

    const handleUpdate = async () => {

        try {

            const response = await api.put(

                `/faculty/${faculty.id}`,

                {

                    name: formData.name,

                    facultyId: faculty.facultyId,

                    email: formData.email,

                    password: faculty.password,

                    department: formData.department

                }

            );

            setFaculty(response.data);

            localStorage.setItem(
                "faculty",
                JSON.stringify(response.data)
            );

            alert("Profile Updated Successfully");

            setEditing(false);

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    };


    // ==============================
    // Loading
    // ==============================

    if (!faculty) {

        return <h2>Loading...</h2>;

    }


    return (

        <div className="faculty-profile-container">


            {/* ==============================
                Faculty Profile Card
            ============================== */}

            <div className="faculty-profile-card">

                <FaUserCircle
                    className="faculty-profile-icon"
                />

                <h2>{faculty.name}</h2>

                <p>{faculty.email}</p>

                <hr />

                <div className="faculty-profile-details">

                    <div>

                        <strong>Faculty ID</strong>

                        <span>
                            {faculty.facultyId}
                        </span>

                    </div>


                    <div>

                        <strong>Department</strong>

                        <span>
                            {faculty.department}
                        </span>

                    </div>


                    <div>

                        <strong>Email</strong>

                        <span>
                            {faculty.email}
                        </span>

                    </div>

                </div>

            </div>


            {/* ==============================
                Faculty Activity
            ============================== */}

            <div className="faculty-stats-card">

                <h2>Faculty Activity</h2>


                <div className="faculty-stats-grid">


                    {/* Uploads */}

                    <div className="faculty-stat-box">

                        <FaUpload />

                        <h3>
                            {uploadCount}
                        </h3>

                        <p>
                            Uploads
                        </p>

                    </div>


                    {/* Materials */}

                    <div className="faculty-stat-box">

                        <FaBook />

                        <h3>
                            {uploadCount}
                        </h3>

                        <p>
                            Materials
                        </p>

                    </div>


                </div>


                {/* ==============================
                    Profile Buttons
                ============================== */}

                <div className="faculty-profile-buttons">

                    <button
                        className="faculty-edit-btn"
                        onClick={handleEdit}
                    >

                        <FaEdit />

                        Edit Profile

                    </button>


                    <button
                        className="faculty-logout-btn"
                        onClick={handleLogout}
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </div>


            {/* ==============================
                Edit Profile Modal
            ============================== */}

            {editing && (

                <div className="modal-overlay">

                    <div className="edit-modal">

                        <h2>
                            Edit Faculty Profile
                        </h2>


                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />


                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />


                        <input
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Department"
                        />


                        <div className="modal-buttons">

                            <button
                                onClick={handleUpdate}
                            >
                                Save
                            </button>


                            <button
                                onClick={() =>
                                    setEditing(false)
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default FacultyProfile;