/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("jwtToken");
		localStorage.removeItem("user-info");
		navigate("/login");
	};
	return (
		<nav className="bg-gray-800 p-4 flex justify-between items-center">
			<div className="flex items-center">
				<img
					src={userInfo?.picture}
					alt={userInfo?.name}
					className="h-10 w-10 rounded-full mr-4"
				/>
				<span className="text-white font-semibold">{userInfo?.name}</span>
			</div>
			<button
				onClick={handleLogout}
				className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
			>
				Cerrar Sesión
			</button>
		</nav>
	);
};

export default Navbar;
