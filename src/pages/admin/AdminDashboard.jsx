import DashboardCard from "../../components/admin/DashboardCard";
import QuickAction from "../../components/admin/QuickAction";
import "../../styles/adminDashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import PostMessage from "../../components/admin/PostMessage";

function AdminDashboard(){
    const [stats, setStats] = useState({

    students: 0,

    faculty: 0,

    materials: 0

});
useEffect(() => {

    fetchDashboardStats();

}, []);

const fetchDashboardStats = async () => {

    try {

        const response = await api.get("/admin/dashboard");

        setStats(response.data);

    }

    catch (error) {

        console.error(error);

        alert("Failed to load dashboard statistics.");

    }

};

    return(

        <div className="admin-dashboard">

            <h1>

                Admin Dashboard

            </h1>

            <div className="dashboard-grid">

                <DashboardCard

                title="Students"

                count={stats.students}

                color="#2563eb"

                />

                <DashboardCard

                title="Faculty"

                count={stats.faculty}

                color="#10b981"

                />

                <DashboardCard

                title="PDF Materials"

                count={stats.materials}

                color="#f59e0b"

                />

                <DashboardCard

                title="Downloads"

                count="-"

                color="#dc2626"

                />

            </div>

            <h2>

                Quick Actions

            </h2>

            <div className="quick-grid">

               <Link to="/manage-students">
                    <QuickAction title="Manage Students" />
                </Link>

                <Link to="/manage-faculty">

                    <QuickAction title="Manage Faculty"/>

                </Link>
                
            </div>
            <PostMessage />

        </div>

    )

}

export default AdminDashboard;