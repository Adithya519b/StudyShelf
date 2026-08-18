import {
    FaFilePdf,
    FaEye,
    FaDownload
} from "react-icons/fa";

function MaterialCard({ material }) {

    const student = JSON.parse(
        localStorage.getItem("student")
    );


    // ==============================
    // Download PDF
    // ==============================

    const handleDownload = () => {

        if (!student) {

            alert("Please login first");

            return;
        }

        window.location.href =
            `http://localhost:8080/api/pdfs/download/${material.id}?studentId=${student.id}`;
    };


    // ==============================
    // View PDF
    // ==============================

    const handleView = () => {

        if (!student) {

            alert("Please login first");

            return;
        }

        window.open(
            `http://localhost:8080/api/pdfs/view/${material.id}?studentId=${student.id}`,
            "_blank"
        );
    };


    return (

        <div className="material-card" id="materials-section" >

            <FaFilePdf className="pdf" />

            <h3>
                {material.title}
            </h3>

            <p>
                Subject : {material.subject}
            </p>

            <p>
                Semester : {material.semester}
            </p>

            <p>
                Faculty : {material.faculty?.name}
            </p>


            <div className="buttons">

                {/* View */}

                <button
                    onClick={handleView}
                >

                    <FaEye />

                    View

                </button>


                {/* Download */}

                <button
                    onClick={handleDownload}
                >

                    <FaDownload />

                    Download

                </button>

            </div>

        </div>

    );

}

export default MaterialCard;