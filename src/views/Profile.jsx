import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const tag = "HINTER_CAR_CH1_REF_SUCT_TEMP"; // El tag que quieres filtrar

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/api/getFileData",
					{
						params: {
							tag,
							page: currentPage,
							limit: 15, // Cantidad de items por página
						},
					}
				);

				setData(response.data.data);
				setCurrentPage(response.data.currentPage);
				setTotalPages(response.data.totalPages);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [currentPage]);

	// Función para cambiar de página
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="p-4">
			<div className="flex justify-between">
				<h1 className="text-2xl font-semibold mb-4">Datos del Proyecto</h1>
				<h3>Pagina {currentPage}</h3>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200 rounded-lg">
					<thead className="bg-gray-100 border-b">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tag
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Moment
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								State
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Value
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{data.map((item) => (
							<tr key={item._id} className="hover:bg-gray-100">
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{item.tag}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{new Date(item.Moment).toLocaleString()}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{item.State}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{item.Value}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Paginación */}
			<div className="mt-4 flex justify-center space-x-2">
				{/* Botón Anterior */}
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-sky-700 text-white font-semibold disabled:bg-gray-300"
				>
					Anterior
				</button>

				{/* Botón Siguiente */}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold disabled:bg-gray-300"
				>
					Siguiente
				</button>
			</div>
		</div>
	);
};

export default Profile;
