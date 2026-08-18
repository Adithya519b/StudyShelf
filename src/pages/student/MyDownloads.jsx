import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/myDownloads.css";

function MyDownloads() {

    const [downloads, setDownloads] = useState([]);

    useEffect(() => {

        fetchMyDownloads();

    }, []);


    const fetchMyDownloads = async () => {

        try {

            const student = JSON.parse(
                localStorage.getItem("student")
            );

            if (!student) {

                alert("Student not logged in");

                return;
            }

            const response = await api.get(
                `/downloads/student/${student.id}`
            );

            setDownloads(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load your downloads.");

        }

    };


    const handleDownload = async (pdfId) => {

        try {

            const student = JSON.parse(
                localStorage.getItem("student")
            );

            const response = await api.get(
                `/pdfs/download/${pdfId}?studentId=${student.id}`,
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "material.pdf"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(error);

            alert("Download failed.");

        }

    };


    return (

        <div className="downloads-page">

            <h1>📥 My Downloads</h1>

            {
                downloads.length > 0 ?

                    downloads.map((download) => {

                        const material = download.pdf;

                        return (

                            <div
                                key={download.id}
                                className="download-card"
                            >

                                <div>

                                    <h3>
                                        {material.title}
                                    </h3>

                                    <p>
                                        {material.subject}
                                    </p>

                                    <p>
                                        {material.faculty?.name}
                                    </p>

                                </div>


                                <div className="download-actions">

                                    <button
                                        onClick={() =>
                                            window.open(
                                                `http://localhost:8080/api/pdfs/view/${material.id}`,
                                                "_blank"
                                            )
                                        }
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDownload(
                                                material.id
                                            )
                                        }
                                    >
                                        Download
                                    </button>

                                </div>

                            </div>

                        );

                    })

                    :

                    <div className="no-downloads">

                        <h3>
                            No Downloads Yet
                        </h3>

                        <p>
                            PDFs you download will appear here.
                        </p>

                    </div>
            }

        </div>

    );

}

export default MyDownloads;