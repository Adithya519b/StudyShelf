import { useState } from "react";
import api from "../../services/api";
function UploadForm({ onUploadSuccess }) {
    const [title,setTitle]=useState("");

    const [department,setDepartment]=useState("");

    const [semester,setSemester]=useState("");

    const [subject,setSubject]=useState("");

    const [description,setDescription]=useState("");

    const [file,setFile]=useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const faculty = JSON.parse(localStorage.getItem("faculty"));

        if (!faculty) {
            alert("Faculty not logged in");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("department", department);
        formData.append("semester", semester);
        formData.append("subject", subject);
        formData.append("facultyId", faculty.id);
        formData.append("file", file);

        const response = await api.post(
            "/pdfs/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        alert("PDF Uploaded Successfully");
        if (onUploadSuccess) {
            onUploadSuccess();
        }

        console.log(response.data);

        // Clear Form
        setTitle("");
        setDepartment("");
        setSemester("");
        setSubject("");
        setDescription("");
        setFile(null);

    } catch (error) {

        console.error(error);

        alert("Upload Failed");

    }

};

    return(

        <form className="upload-form" onSubmit={handleSubmit}>

            <input required

            placeholder="Material Title"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

            />

            <select required
                value={department}
                onChange={(e)=>setDepartment(e.target.value)}
            >
                <option value="">Department</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>EEE</option>
            </select>

            <select required
                value={semester}
                onChange={(e)=>setSemester(e.target.value)}
            >
                <option value="">Semester</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>

            <input required

            placeholder="Subject"

            value={subject}

            onChange={(e)=>setSubject(e.target.value)}

            />

            <textarea

            placeholder="Description"

            value={description}

            onChange={(e)=>setDescription(e.target.value)}

            />

            <input required

            type="file"

            accept=".pdf"

            onChange={(e)=>setFile(e.target.files[0])}

            />

            <button>

                Upload Material

            </button>

        </form>

    )

}

export default UploadForm;