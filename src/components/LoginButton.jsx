import { useGoogleLogin } from "@react-oauth/google"
import { googleAuth } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import logoIcon from './img/logoIcon.png'

const LoginButton = () => {

	const navigate = useNavigate();

	const responseGoogle = async (authResult) => {

		try {

			if (authResult['code']) {
				//console.log(authResult); 
				// Aquí debes enviar el código de autorización para obtener el token
				const response = await googleAuth(authResult["code"]);
				//console.log("Response before: ", response);
				const { email, name, picture } = response.data.user
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
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<a
						className="flex items-center space-x-3 rtl:space-x-reverse"
						href=""
					>
						<img
							alt="Flowbite Logo"
							className="h-8"
							src={logoIcon}
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							VeoliaX´s
						</span>
					</a>
					<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={handleLogin}
							type="button"
						>
							Acceder con Google
						</button>
						<button
							aria-controls="navbar-cta"
							aria-expanded="false"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							data-collapse-toggle="navbar-cta"
							type="button"
						>
							<span className="sr-only">
								Open main menu
							</span>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 17 14"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 1h15M1 7h15M1 13h15"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
							</svg>
						</button>
					</div>
					<div
						className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-cta"
					>
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<a
									aria-current="page"
									className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
									href="#"
								>
									Home
								</a>
							</li>
							<li>
								<a
									className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									href="#"
								>
									About
								</a>
							</li>
							<li>
								<a
									className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									href="#"
								>
									Services
								</a>
							</li>
							<li>
								<a
									className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									href="#"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

		</>
	);
};

export default LoginButton;
