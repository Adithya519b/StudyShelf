import {
    FaBook,
    FaDownload,
    FaFilePdf
} from "react-icons/fa";

import { useEffect, useState } from "react";

import "../styles/dashboardStats.css";

import api from "../services/api";


function DashboardStats() {

    const [stats, setStats] = useState({
        materials: 0,
        downloads: 0
    });


    useEffect(() => {

        fetchStats();

    }, []);


    const fetchStats = async () => {

        try {

            const response = await api.get("/admin/dashboard");

            setStats(response.data);

        } catch (error) {

            console.error(
                "Failed to load dashboard statistics:",
                error
            );

        }

    };


    return (

        <div className="stats-container">


            {/* =================================
                TOTAL PDFs
            ================================= */}

            <div className="stat-book-card">

                <div className="book-animation">

                    <div className="book__pg-shadow"></div>

                    <div className="book__pg"></div>

                    <div className="book__pg book__pg--2"></div>

                    <div className="book__pg book__pg--3"></div>

                    <div className="book__pg book__pg--4"></div>

                    <div className="book__pg book__pg--5"></div>

                </div>


                <div className="stat-book-content">

                    <FaFilePdf />

                    <h2>
                        {stats.materials}
                    </h2>

                    <p>
                        Total PDFs
                    </p>

                </div>

            </div>



            {/* =================================
                DOWNLOADS
            ================================= */}

            <div className="stat-book-card">

                <div className="book-animation">

                    <div className="book__pg-shadow"></div>

                    <div className="book__pg"></div>

                    <div className="book__pg book__pg--2"></div>

                    <div className="book__pg book__pg--3"></div>

                    <div className="book__pg book__pg--4"></div>

                    <div className="book__pg book__pg--5"></div>

                </div>


                <div className="stat-book-content">

                    <FaDownload />

                    <h2>
                        {stats.downloads}
                    </h2>

                    <p>
                        Total Downloads
                    </p>

                </div>

            </div>



            {/* =================================
                SUBJECTS
            ================================= */}

            <div className="stat-book-card">

                <div className="book-animation">

                    <div className="book__pg-shadow"></div>

                    <div className="book__pg"></div>

                    <div className="book__pg book__pg--2"></div>

                    <div className="book__pg book__pg--3"></div>

                    <div className="book__pg book__pg--4"></div>

                    <div className="book__pg book__pg--5"></div>

                </div>


                <div className="stat-book-content">

                    <FaBook />

                    <h2>
                        40
                    </h2>

                    <p>
                        Subjects
                    </p>

                </div>

            </div>


        </div>

    );

}


export default DashboardStats;