import { Link } from "react-router-dom";
import "../../styles/pdfViewer.css";

function PdfViewer() {

    return (

        <div className="viewer">

            <div className="viewer-header">

                <Link to="/student-dashboard">

                    ← Back

                </Link>

                <button>

                    Download PDF

                </button>

            </div>

            <iframe

                src="/pdfs/CN UNIT-1.pdf"

                title="PDF"

            />

        </div>

    )

}

export default PdfViewer;