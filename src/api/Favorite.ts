import api from "./api";

export const apiGetFavorites = () => api().get("/favorite/get");

export const apiLikeCreator = (data: any) => api().post("/favorite/like", data);

export const apiDislikeCreator = (data: any) =>
  api().post("/favorite/dislike", data);
