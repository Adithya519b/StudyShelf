import {
  FaFilePdf,
  FaDownload,
  FaEye
} from "react-icons/fa";

function PdfCard({ material }) {

  return (

    <div className="pdf-card">

      <FaFilePdf className="pdf-icon"/>

      <h3>{material.title}</h3>

      <p><strong>Subject:</strong> {material.subject}</p>

      <p><strong>Semester:</strong> {material.semester}</p>

      <p><strong>Faculty:</strong> {material.faculty}</p>

      <div className="card-buttons">

        <button className="view-btn">

          <FaEye />

          View

        </button>

        <button className="download-btn">

          <FaDownload />

          Download

        </button>

      </div>

    </div>

  );

}

export default PdfCard;