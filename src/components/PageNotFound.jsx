import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

    const navigate = useNavigate();
  return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h2 className="text-center text-3xl font-bold">404 Page Not Found</h2>
			<button
				className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-4"
				onClick={() => navigate("/login")}
			>
				Back Login
			</button>
		</div>
	);
}

export default PageNotFound