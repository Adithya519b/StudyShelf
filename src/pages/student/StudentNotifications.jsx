import { useEffect, useState } from "react";
import {
    FaBell,
    FaArrowLeft,
    FaUserShield,
    FaChalkboardTeacher
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/studentNotifications.css";

function StudentNotifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchNotifications();

    }, []);


    const fetchNotifications = async () => {

        try {

            const response = await api.get("/notifications");

            setNotifications(response.data);

        } catch (error) {

            console.error(
                "Failed to load notifications:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ==============================
    // Sender Icon
    // ==============================

    const getSenderIcon = (senderType) => {

        if (
            senderType?.toUpperCase() === "ADMIN"
        ) {

            return <FaUserShield />;

        }

        return <FaChalkboardTeacher />;

    };


    // ==============================
    // Check Latest Notification
    // ==============================

    const isNewNotification = (createdAt) => {

        if (!createdAt) {
            return false;
        }

        const notificationTime =
            new Date(createdAt).getTime();

        const currentTime =
            new Date().getTime();

        const twentyFourHours =
            24 * 60 * 60 * 1000;

        return (
            currentTime - notificationTime <=
            twentyFourHours
        );

    };


    return (

        <div className="student-notifications-page">

            {/* ==============================
                Header
            ============================== */}

            <div className="notifications-page-header">

                <button
                    className="back-notifications-btn"
                    onClick={() =>
                        navigate("/student-dashboard")
                    }
                >

                    <FaArrowLeft />

                    Back to Dashboard

                </button>


                <div className="notifications-heading">

                    <div className="notifications-heading-icon">

                        <FaBell />

                    </div>

                    <div>

                        <h1>
                            Notifications
                        </h1>

                        <p>
                            Stay updated with the latest
                            announcements.
                        </p>

                    </div>

                </div>

            </div>


            {/* ==============================
                Notifications
            ============================== */}

            <div className="notifications-content">

                {loading ? (

                    <div className="notifications-loading">

                        Loading notifications...

                    </div>

                ) : notifications.length > 0 ? (

                    notifications.map(
                        (notification) => (

                            <div
                                className="full-notification-card"
                                key={notification.id}
                            >

                                {/* ==============================
                                    Sender Icon
                                ============================== */}

                                <div className="notification-card-icon">

                                    {getSenderIcon(
                                        notification.senderType
                                    )}

                                </div>


                                {/* ==============================
                                    Content
                                ============================== */}

                                <div className="notification-card-content">

                                    <div className="notification-card-top">

                                        <div className="notification-title-wrapper">

                                            <h2>
                                                {notification.title}
                                            </h2>


                                            {/* NEW TAG */}

                                            {isNewNotification(
                                                notification.createdAt
                                            ) && (

                                                <span className="notification-new-tag">

                                                    NEW

                                                </span>

                                            )}

                                        </div>


                                        {/* Sender Type */}

                                        <span
                                            className={
                                                notification.senderType?.toUpperCase() ===
                                                "ADMIN"
                                                    ? "notification-admin"
                                                    : "notification-faculty"
                                            }
                                        >

                                            {
                                                notification.senderType
                                            }

                                        </span>

                                    </div>


                                    {/* Message */}

                                    <p className="notification-message">

                                        {
                                            notification.message
                                        }

                                    </p>


                                    {/* Footer */}

                                    <div className="notification-card-footer">

                                        <span>

                                            Posted by{" "}

                                            <strong>
                                                {
                                                    notification.postedBy
                                                }
                                            </strong>

                                        </span>


                                        <span>

                                            {new Date(
                                                notification.createdAt
                                            ).toLocaleString()}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        )
                    )

                ) : (

                    <div className="no-notifications-page">

                        <div className="empty-notification-icon">

                            <FaBell />

                        </div>

                        <h2>
                            No Notifications Yet
                        </h2>

                        <p>
                            New announcements from faculty
                            and admin will appear here.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default StudentNotifications;