import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import UploadForm from "../../components/faculty/UploadForm";
import UploadedMaterialCard from "../../components/faculty/UploadedMaterialCard";
import "../../styles/facultyDashboard.css";
import api from "../../services/api";

import PostMessage from "../../components/admin/PostMessage";
function FacultyDashboard() {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchFacultyPdfs();
    }, []);

    const fetchFacultyPdfs = async () => {

        try {

            const faculty = JSON.parse(localStorage.getItem("faculty"));

            if (!faculty) {
                alert("Faculty not logged in");
                return;
            }

            const response = await api.get(
                `/pdfs/faculty/${faculty.id}`
            );

            setMaterials(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load uploaded materials.");

        }

    };

    return (

        <div className="faculty-dashboard">

           <div className="faculty-header">

    <h1>Faculty Dashboard</h1>

    <button
        className="profile-btn"
        onClick={() => navigate("/faculty-profile")}
    >
        <FaUserCircle />
        Profile
    </button>

</div>

            <UploadForm onUploadSuccess={fetchFacultyPdfs} />
                        <PostMessage senderType="FACULTY" />
            <h2>My Uploaded Materials</h2>

            <div className="uploaded-grid">

                {
                    materials.length > 0 ?

                        materials.map((item) => (

                           <UploadedMaterialCard
                                key={item.id}
                                material={item}
                                onDeleteSuccess={fetchFacultyPdfs}
                            />
                        ))

                        :

                        <h3>No Materials Uploaded Yet</h3>
                }

            </div>


        </div>

    );

}

export default FacultyDashboard;