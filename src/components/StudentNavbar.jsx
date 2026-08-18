import { useEffect, useState } from "react";
import {
    FaBell,
    FaUserCircle,
    FaBookOpen
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentNavbar() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // ==============================
    // Student
    // ==============================

    const [student, setStudent] = useState(null);


    // ==============================
    // Load Student From LocalStorage
    // ==============================

    useEffect(() => {

        const loggedStudent = JSON.parse(
            localStorage.getItem("student")
        );

        if (loggedStudent) {

            setStudent(loggedStudent);

        }

    }, []);


    // ==============================
    // Fetch Notifications
    // ==============================

    useEffect(() => {

        fetchNotifications();

        const interval = setInterval(() => {

            fetchNotifications();

        }, 10000);

        return () => clearInterval(interval);

    }, []);


    const fetchNotifications = async () => {

        try {

            const response = await api.get("/notifications");

            const currentNotifications = response.data;

            setNotifications(currentNotifications);

            const viewedCount = parseInt(
                localStorage.getItem(
                    "notificationsViewedCount"
                ) || "0",
                10
            );

            const newCount =
                currentNotifications.length - viewedCount;

            setUnreadCount(
                newCount > 0 ? newCount : 0
            );

        } catch (error) {

            console.error(
                "Failed to load notifications:",
                error
            );

        }

    };


    // ==============================
    // Open Notifications
    // ==============================

    const openNotifications = () => {

        localStorage.setItem(
            "notificationsViewedCount",
            notifications.length.toString()
        );

        setUnreadCount(0);

        navigate("/student-notifications");

    };


    // ==============================
    // Profile Image URL
    // ==============================

    const getProfileImage = () => {

        if (!student?.profileImage) {

            return null;

        }

        // If backend already returns full URL
        if (
            student.profileImage.startsWith("http://") ||
            student.profileImage.startsWith("https://")
        ) {

            return student.profileImage;

        }

        // If backend returns relative path
        return `http://localhost:8080${student.profileImage}`;

    };


    const profileImage = getProfileImage();


    return (

        <nav className="student-navbar">

            {/* ==============================
                CampusDocs Brand
            ============================== */}

            <Link
                to="/student-dashboard"
                className="student-brand"
            >

                <span className="student-brand-icon">

                    <FaBookOpen />

                </span>

                <span>

                    Study<span>Shelf</span>

                </span>

            </Link>


            <div className="student-right">

                {/* ==============================
                    Notification
                ============================== */}

                <button
                    className="student-notification"
                    aria-label="Notifications"
                    onClick={openNotifications}
                >

                    <FaBell />

                    {unreadCount > 0 && (

                        <span className="notification-dot">

                            {unreadCount > 99
                                ? "99+"
                                : unreadCount
                            }

                        </span>

                    )}

                </button>


                {/* ==============================
                    Downloads
                ============================== */}

                <Link
                    to="/my-downloads"
                    className="downloads-link"
                >

                    Downloads

                </Link>


                {/* ==============================
                    Profile
                ============================== */}

                <Link
                    to="/student-profile"
                    className="student-profile"
                    aria-label="Student Profile"
                >

                    {profileImage ? (

                        <img
                            src={profileImage}
                            alt="Student Profile"
                            className="student-profile-image"
                        />

                    ) : (

                        <FaUserCircle />

                    )}

                </Link>

            </div>

        </nav>

    );

}

export default StudentNavbar;