export const getLocalAccessToken = () =>
  localStorage.getItem("offai_access_token") || "";

export const setLocalAccessToken = (newAccessToken: string) =>
  localStorage.setItem("offai_access_token", newAccessToken);

export const removeLocalAccessToken = () =>
  localStorage.removeItem("offai_access_token");

export const getLocalRefreshToken = () =>
  localStorage.getItem("offai_refresh_token") || "";

export const setLocalRefreshToken = (newRefreshToken: string) =>
  localStorage.setItem("offai_refresh_token", newRefreshToken);

export const removeLocalRefreshToken = () =>
  localStorage.removeItem("offai_refresh_token");
