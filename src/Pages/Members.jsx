import { useEffect, useState } from "react";

const Members = () => {
    const [studentName, setStudentName] = useState("");
    const [studentWeight, setStudentWeight] = useState("");
    const [studentPushUp, setStudentPushUp] = useState("");
    const [allStudents, setAllStudents] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track editing

    // Load students from localStorage on initial render
    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem("All students")) || [];
        setAllStudents(storedStudents);
    }, []);

    // Update localStorage whenever `allStudents` changes
    useEffect(() => {
        localStorage.setItem("All students", JSON.stringify(allStudents));
    }, [allStudents]);

    // Form submit logic
    const handleSubmit = (e) => {
        e.preventDefault();

        const newStudent = {
            studentName,
            studentWeight: parseInt(studentWeight),
            studentPushUp: parseInt(studentPushUp),
        };

        if (editIndex !== null) {
            // Edit existing student
            setAllStudents((prev) =>
                prev.map((student, index) => (index === editIndex ? newStudent : student))
            );
            setEditIndex(null); // Reset editing index
        } else {
            // Add new student
            setAllStudents((prev) => [...prev, newStudent]);
        }

        // Clear form inputs
        setStudentName("");
        setStudentWeight("");
        setStudentPushUp("");
    };

    const handleEdit = (index) => {
        // Set form data to selected student
        const student = allStudents[index];
        setStudentName(student.studentName);
        setStudentWeight(student.studentWeight);
        setStudentPushUp(student.studentPushUp);
        setEditIndex(index); // Set editing index
    };

    return (
        <section className="w-screen min-h-screen bg-green-950 flex items-center justify-center">
            {/* Form div */}
            <div className="w-1/2 h-full flex items-center justify-center">
                <form className="text-center" onSubmit={handleSubmit}>
                    <p className="text-3xl font-bold text-white pb-5">
                        {editIndex !== null ? "Edit Student" : "Enter Student"}
                    </p>
                    <br />

                    <input
                        type="text"
                        placeholder="Enter student fullname"
                        required
                        className="w-96 text-center m-2 p-3 rounded-lg"
                        name="student-name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />
                    <br />

                    <input
                        type="number"
                        placeholder="Enter student weight"
                        required
                        className="w-96 text-center m-2 p-3 rounded-lg"
                        name="student-weight"
                        value={studentWeight}
                        onChange={(e) => setStudentWeight(e.target.value)}
                    />
                    <br />

                    <input
                        type="number"
                        placeholder="Enter student push up count"
                        required
                        className="w-96 text-center m-2 p-3 rounded-lg"
                        name="student-push-up"
                        value={studentPushUp}
                        onChange={(e) => setStudentPushUp(e.target.value)}
                    />
                    <br />

                    <button type="submit" className="mt-5 bg-black text-white pt-3 pb-3 pr-5 pl-5 rounded-xl">
                        {editIndex !== null ? "Update Student" : "Submit"}
                    </button>
                </form>
            </div>

            {/* Members div */}
            <div className="w-1/2 flex items-center justify-center pt-40 pb-40">
                <div className="grid grid-cols-2 gap-7 w-4/5">
                    {allStudents.map((student, index) => (
                        <div key={index} className="bg-black text-white p-5 text-center">
                            <h2>Student: {student.studentName}</h2>
                            <p>Weight: {student.studentWeight}</p>
                            <p>Push ups: {student.studentPushUp}</p>
                            <div className="pt-3">
                                <button
                                    className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() =>
                                        setAllStudents((prev) => prev.filter((_, i) => i !== index))
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Members;