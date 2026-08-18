import { useEffect, useState } from "react";

import {
    FaLaptopCode,
    FaBroadcastTower,
    FaBolt,
    FaBuilding,
    FaCogs,
    FaRobot
} from "react-icons/fa";

import "../styles/departmentCards.css";

import api from "../services/api";


const departments = [

    {
        id: 1,
        name: "CSE",
        icon: <FaLaptopCode />
    },

    {
        id: 2,
        name: "ECE",
        icon: <FaBroadcastTower />
    },

    {
        id: 3,
        name: "EEE",
        icon: <FaBolt />
    },

    {
        id: 4,
        name: "Civil",
        icon: <FaBuilding />
    },

    {
        id: 5,
        name: "Mechanical",
        icon: <FaCogs />
    },

    {
        id: 6,
        name: "AI & DS",
        icon: <FaRobot />
    }

];


function DepartmentCards({ setDepartment }) {

    const [pdfCounts, setPdfCounts] = useState({});


    useEffect(() => {

        fetchDepartmentCounts();

    }, []);


    const fetchDepartmentCounts = async () => {

        try {

            const counts = {};

            for (const dept of departments) {

                const response = await api.get(
                    `/pdfs/department-count/${dept.name}`
                );

                counts[dept.name] = response.data;

            }

            setPdfCounts(counts);

        } catch (error) {

            console.error(
                "Failed to load department PDF counts:",
                error
            );

        }

    };


    return (

        <section className="department-section">

            <h2>Browse by Department</h2>


            <div className="department-grid">

                {departments.map((dept) => (

                    <div
                        className="department-card"
                        key={dept.id}
                       onClick={() => {
    setDepartment(dept.name);

    setTimeout(() => {
        document.getElementById("materials-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}}
                    >

                        <div className="department-content">

                            <div className="dept-icon">

                                {dept.icon}

                            </div>


                            <h3>
                                {dept.name}
                            </h3>


                            <p className="dept-description">

                                {pdfCounts[dept.name] ?? 0} PDF
                                {pdfCounts[dept.name] === 1
                                    ? ""
                                    : "s"} available

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}


export default DepartmentCards;