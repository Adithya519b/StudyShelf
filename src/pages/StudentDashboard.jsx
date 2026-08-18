import { useState, useEffect } from "react";
import StudentNavbar from "../components/StudentNavbar";
import DashboardStats from "../components/DashboardStats";
import DepartmentCards from "../components/DepartmentCards";
import SearchFilter from "../components/SearchFilter";
import MaterialCard from "../components/MaterialCard";
import "../styles/studentDashboard.css";
import api from "../services/api";

function StudentDashboard() {

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");
    const [subject, setSubject] = useState("");

    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {

            const response = await api.get("/pdfs");

            setMaterials(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load materials.");

        }
    };

    const filteredMaterials = materials.filter((material) => {

        const matchesSearch =
            material.title.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment =
            department === "" ||
            material.department === department;

        const matchesSemester =
            semester === "" ||
            material.semester === Number(semester);

        const matchesSubject =
            subject === "" ||
            material.subject === subject;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesSemester &&
            matchesSubject
        );

    });

    return (

        <div className="student-dashboard">

            <StudentNavbar />

            <main className="dashboard-content">

                <DashboardStats />

                <DepartmentCards
                    setDepartment={setDepartment}
                />

                <SearchFilter
                    search={search}
                    setSearch={setSearch}
                    department={department}
                    setDepartment={setDepartment}
                    semester={semester}
                    setSemester={setSemester}
                    subject={subject}
                    setSubject={setSubject}
                />

                <section className="materials-section">

                    <div className="materials-header">

                        <div>
                            <span className="section-label">
                                ACADEMIC RESOURCES
                            </span>

                            <h1>
                                Study Materials
                            </h1>

                            <p>
                                Browse and access your academic resources.
                            </p>
                        </div>

                        <div className="material-count">
                            <strong>
                                {filteredMaterials.length}
                            </strong>

                            <span>
                                {filteredMaterials.length === 1
                                    ? " Material"
                                    : " Materials"}
                            </span>
                        </div>

                    </div>


                    <div className="materials-container">

                        {filteredMaterials.length > 0 ? (

                            filteredMaterials.map((material) => (

                                <MaterialCard
                                    key={material.id}
                                    material={material}
                                />

                            ))

                        ) : (

                            <div className="no-materials">

                                <div className="empty-icon">
                                    📚
                                </div>

                                <h2>
                                    No Materials Found
                                </h2>

                                <p>
                                    Try changing your search or filters
                                    to find more resources.
                                </p>

                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>

    );
}

export default StudentDashboard;