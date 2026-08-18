import { useEffect, useState } from "react";
import {
    FaUserCircle,
    FaDownload,
    FaHeart,
    FaEye,
    FaEdit,
    FaSignOutAlt,
    FaCamera
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/studentProfile.css";
import api from "../../services/api";

function StudentProfile() {

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [editing, setEditing] = useState(false);

    const [downloadCount, setDownloadCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        semester: ""
    });

    const handleProfileImageChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
    }

    try {

        setUploadingImage(true);

        const formData = new FormData();

        formData.append("file", file);

        const response = await api.post(
            `/students/${student.id}/profile-image`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        const updatedStudent = response.data;

        setStudent(updatedStudent);

        setProfileImage(
            updatedStudent.profileImage
        );

        localStorage.setItem(
            "student",
            JSON.stringify(updatedStudent)
        );

        alert("Profile image updated successfully");

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to upload profile image"
        );

    } finally {

        setUploadingImage(false);

    }
};


    // ==============================
    // Load Student
    // ==============================

    useEffect(() => {

        const loggedStudent = JSON.parse(
            localStorage.getItem("student")
        );

        if (!loggedStudent) {

            navigate("/student-login");

            return;
        }

        setStudent(loggedStudent);

        setFormData({
            name: loggedStudent.name,
            email: loggedStudent.email,
            department: loggedStudent.department,
            semester: loggedStudent.semester
        });
        setStudent(loggedStudent);

setProfileImage(loggedStudent.profileImage);

        fetchActivityCounts(loggedStudent.id);

    }, [navigate]);


    // ==============================
    // Fetch Activity Counts
    // ==============================

    const fetchActivityCounts = async (studentId) => {

        try {

            const [downloadResponse, viewResponse] =
                await Promise.all([

                    api.get(
                        `/students/${studentId}/download-count`
                    ),

                    api.get(
                        `/students/${studentId}/view-count`
                    )

                ]);

            setDownloadCount(downloadResponse.data);

            setViewCount(viewResponse.data);

        } catch (error) {

            console.error(
                "Failed to load activity counts:",
                error
            );

        }

    };


    // ==============================
    // Logout
    // ==============================

    const handleLogout = () => {

        localStorage.removeItem("student");

        navigate("/student-login");

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
    // Update Profile
    // ==============================

    const handleUpdate = async () => {

        try {

            const response = await api.put(

                `/students/${student.id}`,

                {

                    name: formData.name,

                    rollNo: student.rollNo,

                    email: formData.email,

                    password: student.password,

                    department: formData.department,

                    semester: formData.semester

                }

            );

            setStudent(response.data);

            localStorage.setItem(
                "student",
                JSON.stringify(response.data)
            );

            alert("Profile Updated Successfully");

            setEditing(false);

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    };


    // ==============================
    // Loading
    // ==============================

    if (!student) {

        return <h2>Loading...</h2>;

    }


    return (

        <div className="profile-container">


            {/* ==============================
                Profile Card
            ============================== */}

            <div className="profile-card">

                <div className="profile-image-wrapper">

    {profileImage ? (

        <img
            src={`http://localhost:8080${profileImage}`}
            alt="Profile"
            className="profile-image"
        />

    ) : (

        <FaUserCircle className="profile-icon" />

    )}

    <label
        htmlFor="profile-image-input"
        className="profile-image-edit"
        title="Change Profile Photo"
    >
        <FaCamera />
    </label>

    <input
        id="profile-image-input"
        type="file"
        accept="image/*"
        onChange={handleProfileImageChange}
        hidden
    />

</div>
                <h2>
                    {student.name}
                </h2>

                <p>
                    {student.email}
                </p>

                <hr />


                <div className="profile-details">

                    <div>

                        <strong>
                            Department
                        </strong>

                        <span>
                            {student.department}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Semester
                        </strong>

                        <span>
                            {student.semester}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Roll Number
                        </strong>

                        <span>
                            {student.rollNo}
                        </span>

                    </div>


                    <div>

                        <strong>
                            College
                        </strong>

                        <span>
                            Sri Venkatesa Perumal College
                            of Engineering and Technology
                        </span>

                    </div>

                </div>

            </div>


            {/* ==============================
                Activity
            ============================== */}

            <div className="stats-card">

                <h2>
                    Your Activity
                </h2>


                <div className="stats-grid">


                    {/* Downloads */}

                    <div className="stat-box">

                        <FaDownload />

                        <h3>
                            {downloadCount}
                        </h3>

                        <p>
                            Downloads
                        </p>

                    </div>


                    {/* Favorites */}

                   


                    {/* Views */}

                    <div className="stat-box">

                        <FaEye />

                        <h3>
                            {viewCount}
                        </h3>

                        <p>
                            Viewed
                        </p>

                    </div>

                </div>


                {/* ==============================
                    Profile Buttons
                ============================== */}

                <div className="profile-buttons">

                    <button
                        className="edit-btn"
                        onClick={handleEdit}
                    >

                        <FaEdit />

                        Edit Profile

                    </button>


                    <button
                        className="logout-btn"
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
                            Edit Profile
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


                        <input
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            placeholder="Semester"
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

export default StudentProfile;