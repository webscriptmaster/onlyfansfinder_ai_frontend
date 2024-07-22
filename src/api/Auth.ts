import api from "./api";

// Login
export const apiLogin = (data: any) => api().post("/auth/login", data);

// Logout
export const apiLogout = () => api().post("/auth/logout");

// Register
export const apiRegister = (data: any) => api().post("/auth/register", data);

// Update personal information
export const apiUpdatePersonal = (data: any) =>
  api().post("/auth/update-personal", data);

// Update fan information
export const apiUpdateFan = (data: any) =>
  api().postForm("/auth/update-fan", data);

// Change password
export const apiChangePassword = (data: any) =>
  api().post("/auth/change-password", data);
