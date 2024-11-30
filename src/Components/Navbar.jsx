import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-black text-white overflow-hidden">
            <nav className="container p-5 flex justify-between">
                <Link to="/" className="text-lg font-bold hover:underline">
                    GOA Push Ups
                </Link>
                <div className="space-x-4">
                    <Link to="/members" className="hover:underline">
                        Members List
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;