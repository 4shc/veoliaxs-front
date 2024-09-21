import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import DashBoard from "./components/DashBoard";
import PageNotFound from "./components/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./views/Home";
import Profile from "./views/Profile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
//import Home from "./components/Home";

function App() {
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
	// Configuración del proveedor de autenticación Google
	const GoogleOAuthWrapper = () => {
		return (
			<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
				<LoginButton></LoginButton>
			</GoogleOAuthProvider>
		);
	};

	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<GoogleOAuthWrapper />} />
					<Route index="/login" />
					{/* Rutas protegidas */}
					{/* Ruta protegida para el dashboard y rutas hijas */}
					<Route element={<PrivateRoute />}>
						<Route path="/dashboard" element={<DashBoard />}>
							<Route path="profile" element={<Profile />} />
							<Route path="home" element={<Home />} />
						</Route>
					</Route>

					{/* Ruta por defecto */}
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
/* 
<Route path="/login" element={<GoogleOAuthWrapper />} />
<Route path="/" element={<Navigate to="/login" />} />
 */
