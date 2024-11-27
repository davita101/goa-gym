
import CustomizedTables from "../Components/TableComponent";

const Winner = () => {

    return (
        <div className="overflow-hidden">
            <CustomizedTables />
        </div>
        // ! დავთის 
        // <section className="bg-green-950 w-screen min-h-screen flex items-center justify-center flex-col">
        //     <h1 className="text-3xl text-white p-5">This is the page where points of all members are shown</h1>
        //     <button onClick={() => setCount((prev) => prev + 1)}>Refresh</button>

        //     <ul className="grid grid-cols-3 gap-4 pt-10">
        //  {sortedStudents.map((student, index) => (

        //             <li key={index} className="p-2 text-center">
        //                 <p className="text-white">
        //                     <label className="font-bold text-black">Student name:</label> {student.studentName}
        //                 </p>
        //                 <p className="text-white">
        //                     <label className="font-bold text-black">Student weight:</label> {student.studentWeight}
        //                 </p>
        //                 <p className="text-white">
        //                     <label className="font-bold text-black">Student push ups count:</label> {student.studentPushUp}
        //                 </p>
        //                 <p className="text-white">
        //                     <label className="font-bold text-black">Student score:</label> {calculateScore(student).toFixed(2)}
        //                 </p>
        //             </li>
        //         ))} 
        // </ul>
        // </section>
    );
};

export default Winner;