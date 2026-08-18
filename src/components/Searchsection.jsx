import { FaSearch } from "react-icons/fa";
import "../styles/search.css";

function SearchSection() {

    return (

        <section className="search-section">

            <h2>Find Your Study Material</h2>

            <p>

                Search notes by title, department,
                semester or subject.

            </p>

            <div className="search-container">

                <div className="search-box">

                    <FaSearch className="search-icon"/>

                   <input type="text" placeholder="Search PDF..." />

                </div>

                <select>

                    <option>Department</option>

                    <option>CSE</option>

                    <option>ECE</option>

                    <option>EEE</option>

                    <option>MECH</option>

                    <option>CIVIL</option>

                </select>

                <select>

                    <option>Semester</option>

                    <option>1</option>

                    <option>2</option>

                    <option>3</option>

                    <option>4</option>

                    <option>5</option>

                    <option>6</option>

                    <option>7</option>

                    <option>8</option>

                </select>

                <select>

                    <option>Subject</option>

                    <option>Java</option>

                    <option>DBMS</option>

                    <option>Operating Systems</option>

                    <option>Computer Networks</option>

                    <option>Python</option>

                </select>

            </div>

        </section>

    );

}

export default SearchSection;