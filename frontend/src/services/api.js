import axios from "axios";

// ✅ Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});


// ✅ Attach token automatically (VERY IMPORTANT)
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ================= AUTH =================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);


// ================= TASKS =================

export const getTasks = () =>
  API.get("/tasks");

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const toggleTask = (id) =>
  API.patch(`/tasks/${id}`);
export const createTask = (data) =>
  API.post("/tasks", data);
export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);


export default API;
