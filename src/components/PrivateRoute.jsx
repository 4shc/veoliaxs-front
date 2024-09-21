/* eslint-disable react/prop-types */
/* import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RefreshAuthenticated = ({ setIsAuthenticated }) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const dataUser = localStorage.getItem("user-info");
		const token = JSON.parse(dataUser)?.token;

		if (token) {
			setIsAuthenticated(true);
			// Solo redirigir si el usuario está en "/login" o "/"
			if (location.pathname === "/" || location.pathname === "/login") {
				navigate("/dashboard", { replace: true });
			}
		} else {
			setIsAuthenticated(false);
			// Si no está autenticado y está intentando acceder a cualquier ruta de dashboard, redirigir al login
			if (location.pathname.startsWith("/dashboard")) {
				navigate("/login", { replace: true });
			}
		}
	}, [setIsAuthenticated, location, navigate]);

	return null;
};

export default RefreshAuthenticated;
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Outlet path="profile" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
