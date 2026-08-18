import { Link } from "react-router-dom";
import {
    FaBookOpen,
    FaDownload,
    FaUpload,
    FaArrowRight
} from "react-icons/fa";
import "../styles/home.css";

function Hero() {
    return (
        <section className="hero">

            {/* Decorative background elements */}
            <div className="hero-glow hero-glow-one"></div>
            <div className="hero-glow hero-glow-two"></div>

            <div className="hero-container">

                {/* Left Content */}
                <div className="hero-left">

                    <span className="tag">
                        <span className="tag-dot"></span>
                        📚 Smart Academic Resource Portal
                    </span>

                    <h1>
                        Your Campus.
                        <br />
                        <span>All Your Knowledge.</span>
                    </h1>

                    <h2>
                        Share Knowledge. Learn Together.
                    </h2>

                    <p>
                        Upload, organize and access lecture notes,
                        previous question papers, lab manuals and
                        study materials — all in one place.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/student-login"
                            className="primary-btn"
                        >
                            Student Login
                            <FaArrowRight />
                        </Link>

                        <Link
                            to="/faculty-login"
                            className="secondary-btn"
                        >
                            Faculty Login
                        </Link>

                    </div>

                    <div className="hero-trust">
                        <span>
                            ✓ Easy to access
                        </span>

                        <span>
                            ✓ Organized resources
                        </span>

                        <span>
                            ✓ Built for students
                        </span>
                    </div>

                </div>


                {/* Right Statistics */}
                <div className="hero-right">

                    <div className="stats-heading">
                        <span>CampusDocs</span>
                        <p>Growing every day</p>
                    </div>

                    <div className="hero-card hero-card-main">

                        <div className="card-icon purple">
                            <FaBookOpen />
                        </div>

                        <div className="card-content">
                            <h3>1200<span>+</span></h3>
                            <p>PDF Materials</p>
                        </div>

                        <div className="card-badge">
                            Academic
                        </div>

                    </div>


                    <div className="hero-card">

                        <div className="card-icon teal">
                            <FaUpload />
                        </div>

                        <div className="card-content">
                            <h3>35<span>+</span></h3>
                            <p>Faculty Uploaders</p>
                        </div>

                    </div>


                    <div className="hero-card">

                        <div className="card-icon cyan">
                            <FaDownload />
                        </div>

                        <div className="card-content">
                            <h3>500<span>+</span></h3>
                            <p>Student Downloads</p>
                        </div>

                    </div>

                    <div className="stats-footer">
                        <span className="online-dot"></span>
                        Resources available anytime
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;