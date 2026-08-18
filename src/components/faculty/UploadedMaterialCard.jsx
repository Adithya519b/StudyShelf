import {
    FaFilePdf,
    FaTrash,
    FaEdit,
    FaDownload,
    FaEye
} from "react-icons/fa";

import api from "../../services/api";


function UploadedMaterialCard({
    material,
    onDeleteSuccess
}) {


    // ==============================
    // View PDF
    // ==============================

    const handleView = () => {

        window.open(
            `http://localhost:8080/api/pdfs/view/${material.id}`,
            "_blank"
        );

    };


    // ==============================
    // Download PDF
    // ==============================

    const handleDownload = () => {

        window.location.href =
            `http://localhost:8080/api/pdfs/download/${material.id}`;

    };


    // ==============================
    // Delete PDF
    // ==============================

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this PDF?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await api.delete(
                `/pdfs/${material.id}`
            );

            alert(
                "PDF Deleted Successfully"
            );


            if (onDeleteSuccess) {

                onDeleteSuccess();

            }


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete PDF"
            );

        }

    };


    return (

        <div className="uploaded-card">


            {/* PDF Icon */}

            <FaFilePdf className="pdf-icon" />


            {/* Title */}

            <h3>
                {material.title}
            </h3>


            {/* Subject */}

            <p>
                <strong>Subject:</strong>{" "}
                {material.subject}
            </p>


            {/* Department */}

            <p>
                <strong>Department:</strong>{" "}
                {material.department}
            </p>


            {/* Semester */}

            <p>
                <strong>Semester:</strong>{" "}
                {material.semester}
            </p>


            {/* Actions */}

            <div className="card-actions">


                {/* View */}

                <button
                    type="button"
                    title="View PDF"
                    onClick={handleView}
                >

                    <FaEye />

                </button>


                {/* Download */}

                <button
                    type="button"
                    title="Download PDF"
                    onClick={handleDownload}
                >

                    <FaDownload />

                </button>


                {/* Edit */}

                <button
                    type="button"
                    title="Edit"
                    disabled
                >

                    <FaEdit />

                </button>


                {/* Delete */}

                <button
                    type="button"
                    title="Delete"
                    onClick={handleDelete}
                >

                    <FaTrash />

                </button>


            </div>


        </div>

    );

}


export default UploadedMaterialCard;