import { FaSearch } from "react-icons/fa";

function SearchFilter({
    search,
    setSearch,
    department,
    setDepartment,
    semester,
    setSemester,
    subject,
    setSubject
}) {
    <>
    <input
    type="text"
    placeholder="Search PDFs..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
/>

 <select value={department} onChange={(e)=>setDepartment(e.target.value)} >
    <option value="">All Departments</option>
    <option value="CSE">CSE</option>
    <option value="ECE">ECE</option>
    <option value="EEE">EEE</option>
</select>
<select
    value={semester}
    onChange={(e)=>setSemester(e.target.value)}
>
    <option value="">All Semesters</option>

    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>

</select>
<select
    value={subject}
    onChange={(e)=>setSubject(e.target.value)}
>
    <option value="">All Subjects</option>

    <option value="Java">Java</option>
    <option value="DBMS">DBMS</option>
    <option value="CN">CN</option>
    <option value="OS">OS</option>

</select>
</>
}

export default SearchFilter;