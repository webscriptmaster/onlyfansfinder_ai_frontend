import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { IUser } from "@/types/interfaces";
import { toastError } from "@/lib/toast";
import {
  apiDislikeCreator,
  apiGetFavorites,
  apiLikeCreator
} from "@/api/Favorite";

interface IFavoriteState {
  hasHydrated: boolean;
  loading: boolean;
  favorites: IUser[];

  setHasHydrated: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setFavorites: (payload: IUser[]) => void;

  getFavoritesAction: () => void;
  likeCreatorAction: (data: any) => void;
  dislikeCreatorAction: (data: any) => void;
}

const useFavoriteStore = create<IFavoriteState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      loading: false,
      favorites: [],

      setHasHydrated: (payload: boolean) => set({ hasHydrated: payload }),
      setLoading: (payload: boolean) => set({ loading: payload }),
      setFavorites: (payload: IUser[]) => set({ favorites: payload }),

      getFavoritesAction: async () => {
        try {
          set({ loading: true });
          const response = await apiGetFavorites();
          set({ favorites: response.data.result });
        } catch (err: any) {
          console.error(err);
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.msg
          ) {
            toastError(err.response.data.msg);
          } else {
            toastError("Something went wrong. Please try again later.");
          }
        } finally {
          set({ loading: false });
        }
      },

      likeCreatorAction: async (data: any) => {
        try {
          set({ loading: true });
          await apiLikeCreator(data);
          const response = await apiGetFavorites();
          set({ favorites: response.data.result });
        } catch (err: any) {
          console.error(err);
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.msg
          ) {
            toastError(err.response.data.msg);
          } else {
            toastError("Something went wrong. Please try again later.");
          }
        } finally {
          set({ loading: false });
        }
      },

      dislikeCreatorAction: async (data: any) => {
        try {
          set({ loading: true });
          await apiDislikeCreator(data);
          const response = await apiGetFavorites();
          set({ favorites: response.data.result });
        } catch (err: any) {
          console.error(err);
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.msg
          ) {
            toastError(err.response.data.msg);
          } else {
            toastError("Something went wrong. Please try again later.");
          }
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: "offai-favorite",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);

export default useFavoriteStore;
