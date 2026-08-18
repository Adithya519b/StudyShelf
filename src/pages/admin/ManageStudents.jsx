
import { useEffect, useState } from "react";
import api from "../../services/api";
//import studentsData from "../../data/students";
import "../../styles/manageStudents.css";

function ManageStudents() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {

    fetchStudents();

}, []);
const [showModal, setShowModal] = useState(false);

const [editingStudent, setEditingStudent] = useState({

    id: "",

    name: "",

    email: "",

    department: "",

    semester: ""

});

const fetchStudents = async () => {

    try {

        const response = await api.get("/students");

        setStudents(response.data);

    }

    catch (error) {

        console.error(error);

        alert("Failed to load students");

    }

};
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(search.toLowerCase())
    );

   const deleteStudent = async (id) => {

    if (!window.confirm("Delete this student?")) {

        return;

    }

    try {

        await api.delete(`/students/${id}`);

        alert("Student Deleted Successfully");

        fetchStudents();

    }

    catch (error) {

        console.error(error);

        alert("Failed to delete student.");

    }

};
const editStudent = (student) => {

    setEditingStudent({

        id: student.id,

        name: student.name,

        email: student.email,

        department: student.department,

        semester: student.semester

    });

    setShowModal(true);

};
const updateStudent = async () => {

    try {

        await api.put(

            `/students/${editingStudent.id}`,

            {

                name: editingStudent.name,

                email: editingStudent.email,

                department: editingStudent.department,

                semester: editingStudent.semester

            }

        );

        alert("Student Updated Successfully");

        setShowModal(false);

        fetchStudents();

    }

    catch (error) {

        console.error(error);

        alert("Failed to update student");

    }

};

    return (

        <div className="manage-page">

            <h1>Manage Students</h1>

            <input
                className="search-input"
                type="text"
                placeholder="Search by Name or Roll Number..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

            <table>

                <thead>

                    <tr>

                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Semester</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredStudents.map(student=>(

                            <tr key={student.id}>

                                <td>{student.rollNo}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.department}</td>
                                <td>{student.semester}</td>

                                <td>

                                    <button className="edit-btn"  onClick={() => editStudent(student)}>
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={()=>deleteStudent(student.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>
            {
    showModal && (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Edit Student</h2>

                <input
                    value={editingStudent.name}
                    onChange={(e) =>
                        setEditingStudent({
                            ...editingStudent,
                            name: e.target.value
                        })
                    }
                    placeholder="Name"
                />

                <input
                    value={editingStudent.email}
                    onChange={(e) =>
                        setEditingStudent({
                            ...editingStudent,
                            email: e.target.value
                        })
                    }
                    placeholder="Email"
                />

                <select
                    value={editingStudent.department}
                    onChange={(e) =>
                        setEditingStudent({
                            ...editingStudent,
                            department: e.target.value
                        })
                    }
                >
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>EEE</option>
                </select>

                <input
                    type="number"
                    value={editingStudent.semester}
                    onChange={(e) =>
                        setEditingStudent({
                            ...editingStudent,
                            semester: Number(e.target.value)
                        })
                    }
                />

                <div className="modal-buttons">

                    <button
                        className="delete-btn"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="edit-btn"
                        onClick={updateStudent}
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>

    )
}

        </div>

    );

}

export default ManageStudents;