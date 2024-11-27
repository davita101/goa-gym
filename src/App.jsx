import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Members from "./Pages/Members";
import Winner from "./Pages/Winner";

const App = () => {
    return (
        <Router>
            <header className="absolute w-full">
                <Navbar />
            </header>

            <main> {/* Add padding to avoid overlap with Navbar */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/winner" element={<Winner />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;