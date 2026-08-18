import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/manageFaculty.css";

function ManageFaculty() {

    const [faculty, setFaculty] = useState([]);

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

const [editingFaculty, setEditingFaculty] = useState({

    id: "",

    name: "",

    email: "",

    department: ""

});
    useEffect(() => {

        fetchFaculty();

    }, []);

    const fetchFaculty = async () => {

        try {

            const response = await api.get("/faculty");

            setFaculty(response.data);

        }

        catch (error) {

            console.error(error);

            alert("Failed to load faculty.");

        }

    };

    const deleteFaculty = async (id) => {

        if (!window.confirm("Delete this faculty?")) {

            return;

        }

        try {

            await api.delete(`/faculty/${id}`);

            alert("Faculty Deleted Successfully");

            fetchFaculty();

        }

        catch (error) {

            console.error(error);

            alert("Failed to delete faculty.");

        }

    };
    const editFaculty = (faculty) => {

    setEditingFaculty({

        id: faculty.id,

        name: faculty.name,

        email: faculty.email,

        department: faculty.department

    });

    setShowModal(true);

};
const updateFaculty = async () => {

    try {

        await api.put(

            `/faculty/${editingFaculty.id}`,

            {

                name: editingFaculty.name,

                email: editingFaculty.email,

                department: editingFaculty.department

            }

        );

        alert("Faculty Updated Successfully");

        setShowModal(false);

        fetchFaculty();

    }

    catch (error) {

        console.error(error);

        alert("Failed to update faculty.");

    }

};

    const filteredFaculty = faculty.filter(item =>

        item.name.toLowerCase().includes(search.toLowerCase()) ||

        item.facultyId.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="manage-page">

            <h1>Manage Faculty</h1>

            <input

                className="search-input"

                placeholder="Search Faculty..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />

            <table>

                <thead>

                    <tr>

                        <th>Faculty ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredFaculty.map(item => (

                            <tr key={item.id}>

                                <td>{item.facultyId}</td>

                                <td>{item.name}</td>

                                <td>{item.email}</td>

                                <td>{item.department}</td>

                                <td>

                                    <button className="edit-btn" onClick={() => editFaculty(item)}>

                                        Edit

                                    </button>

                                    <button

                                        className="delete-btn"

                                        onClick={() => deleteFaculty(item.id)}

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

                <h2>Edit Faculty</h2>

                <input

                    value={editingFaculty.name}

                    onChange={(e) =>

                        setEditingFaculty({

                            ...editingFaculty,

                            name: e.target.value

                        })

                    }

                    placeholder="Faculty Name"

                />

                <input

                    value={editingFaculty.email}

                    onChange={(e) =>

                        setEditingFaculty({

                            ...editingFaculty,

                            email: e.target.value

                        })

                    }

                    placeholder="Email"

                />

                <select

                    value={editingFaculty.department}

                    onChange={(e) =>

                        setEditingFaculty({

                            ...editingFaculty,

                            department: e.target.value

                        })

                    }

                >

                    <option>CSE</option>

                    <option>ECE</option>

                    <option>EEE</option>

                </select>

                <div className="modal-buttons">

                    <button

                        className="delete-btn"

                        onClick={() => setShowModal(false)}

                    >

                        Cancel

                    </button>

                    <button

                        className="edit-btn"

                        onClick={updateFaculty}

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

export default ManageFaculty;