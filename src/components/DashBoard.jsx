import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";

const DashBoard = () => {
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		const data = localStorage.getItem("user-info");
		//console.log(data);
		if (data) {
			setUserInfo(JSON.parse(data));
		}
	}, []);

	return (
		<div>
			<Navbar userInfo={userInfo} />
			<div className="">
				<section className="flex justify-between lg:justify-around mt-4 ">
					<h1 className="ml-3 text-2xl font-bold">
						Bienvenido <span className="text-sky-800">{userInfo?.name}</span>
					</h1>

					{/* Botones para navegar a Home y Profile */}
					<div className="mb-6 space-x-4">
						<Link to="/dashboard/home">
							<button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-gray-500 text-white font-semibold disabled:bg-gray-300 uppercase">
								Project EMPRESA_LACTEA_SOL
							</button>
						</Link>

						<Link to="/dashboard/profile">
							<button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-gray-500 text-white font-semibold disabled:bg-gray-300 uppercase">
								Project Empresa HINTER_CAR
							</button>
						</Link>
					</div>
				</section>

				<Outlet />
			</div>
		</div>
	);
};

export default DashBoard
