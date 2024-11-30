import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Winner from "./Pages/Winner";

const App = () => {
    return (
        <Router className="">
            <header className="absolute w-full">
                <Navbar />
            </header>

            <main className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full min-h-screen "> {/* Add padding to avoid overlap with Navbar */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/members" element={<Winner />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;