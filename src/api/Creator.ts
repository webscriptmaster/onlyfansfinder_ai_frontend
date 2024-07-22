import api from "./api";

// Search creators
export const apiSearchCreators = (data: any) =>
  api().post("/creator/search", data);
