import { Link } from "react-router-dom";
import { FaBookOpen, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="logo">
                    <span className="logo-icon">
                        <FaBookOpen />
                    </span>

                    <span className="logo-text">
                        Study<span>Shelf</span>
                    </span>
                </Link>

                {/* Login */}
                <div className="login-dropdown">
                    <button
                        className={`login-btn ${showMenu ? "active" : ""}`}
                        onClick={toggleMenu}
                        aria-expanded={showMenu}
                        aria-haspopup="true"
                    >
                        <span>Login</span>

                        <FaChevronDown
                            className={`login-chevron ${
                                showMenu ? "rotate" : ""
                            }`}
                        />
                    </button>

                    {showMenu && (
                        <div className="dropdown">

                            <Link
                                to="/student-login"
                                onClick={closeMenu}
                            >
                                <span className="dropdown-icon">🎓</span>

                                <span>
                                    <strong>Student</strong>
                                    <small>Access learning materials</small>
                                </span>
                            </Link>

                            <Link
                                to="/faculty-login"
                                onClick={closeMenu}
                            >
                                <span className="dropdown-icon">👨‍🏫</span>

                                <span>
                                    <strong>Faculty</strong>
                                    <small>Manage course materials</small>
                                </span>
                            </Link>

                            <Link
                                to="/admin-login"
                                onClick={closeMenu}
                            >
                                <span className="dropdown-icon">⚙️</span>

                                <span>
                                    <strong>Admin</strong>
                                    <small>Manage CampusDocs</small>
                                </span>
                            </Link>

                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;