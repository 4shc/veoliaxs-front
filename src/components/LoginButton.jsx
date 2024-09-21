import { useGoogleLogin } from "@react-oauth/google"
import { googleAuth } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {

	const navigate = useNavigate();

	const responseGoogle = async (authResult) => {
		
		try {
			
			if(authResult['code']) {
				//console.log(authResult); 
				// Aquí debes enviar el código de autorización para obtener el token
				const response = await googleAuth(authResult["code"]);
				//console.log("Response before: ", response);
				const {email, name, picture } = response.data.user
				const token = response.data.token
				const infoUser = { email, name, picture, token }
				// Guardar el token y datos del usuario en localStorage
				localStorage.setItem("user-info", JSON.stringify(infoUser));
                
				//console.log("Response after: ", response.data.user);
				navigate("/dashboard");
                //window.location.href = "/home"; // Redirigir a la página de inicio
			}

		} catch (error) {
			console.error('Error mientras solito el código a Google: ', error)
		}
	}
	const handleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});
	

	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="mx-auto text-2xl font-semibold text-center">
					Inicia Sesión en{" "}
					<span className="text-sky-900 text-2xl font-bold">Veolia</span>
				</h1>
				<button
					onClick={handleLogin}
					className="mt-8 border border-blue-500 text-slate-900 py-4 px-6 bg-transparent hover:bg-blue-500 hover:text-white transition text-lg font-semibold rounded-lg"
				>
					Iniciar Sesión con Google
				</button>
			</div>
		</>
	);
};

export default LoginButton;

