import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL, // Cambia la URL a la correcta
	headers: {
		"Content-Type": "application/json",
	},
});

export const googleAuth = async (code) => await api.get(`/google?code=${code}`);