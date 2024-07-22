import { fakerEN_US as faker } from "@faker-js/faker";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { IUser } from "@/types/interfaces";
import { toastError } from "@/lib/toast";
import { apiSearchCreators } from "@/api/Creator";

const isProduction = true;

interface ISearchState {
  hasHydrated: boolean;
  loading: boolean;
  keyword: string;
  selected: {
    category: string;
    condition: Record<string, any>;
  }[];
  includeFavorite: boolean;
  pagination: number;
  result: IUser[];

  setHasHydrated: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setKeyword: (payload: string) => void;
  setSelected: (payload: any) => void;
  clearSelected: () => void;
  setIncludeFavorite: (payload: boolean) => void;
  setPagination: (payload: number) => void;
  setResult: (payload: IUser[]) => void;

  searchCreatorsAction: (params: any, onSuccessCallback: () => void) => void;
  searchMoreAction: (params: any) => void;
}

const useSearchStore = create<ISearchState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      loading: false,
      keyword: "",
      selected: [],
      includeFavorite: false,
      pagination: 1,
      result: [],

      setHasHydrated: (payload: boolean) => set({ hasHydrated: payload }),

      setLoading: (payload: boolean) => set({ loading: payload }),

      setKeyword: (payload: string) => set({ keyword: payload }),

      setSelected: (payload: any) => {
        const { category, condition } = payload;
        const filteredSelected = get().selected.filter(
          (s) => s.category !== category
        );
        filteredSelected.push({ category, condition });

        set({
          selected: filteredSelected
        });
      },

      clearSelected: () => {
        set({
          selected: []
        });
      },

      setIncludeFavorite: (payload: boolean) =>
        set({ includeFavorite: payload }),

      setPagination: (payload: number) => set({ pagination: payload }),

      setResult: (payload: IUser[]) => set({ result: payload }),

      searchCreatorsAction: async (params: any, onSuccessCallback) => {
        try {
          set({ loading: true });
          const response = await apiSearchCreators({
            ...params,
            pagination: get().pagination
          });

          if (isProduction) {
            set({ result: response.data.result });
          } else {
            const { result } = response.data;
            for (let i = 0; i < result.length; i++) {
              result[i].avatar = faker.image.url();
            }
            set({ result });
          }

          onSuccessCallback();
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

      searchMoreAction: async (params: any) => {
        try {
          set({ loading: true });
          const response = await apiSearchCreators({
            ...params,
            pagination: get().pagination + 1
          });

          set({ pagination: get().pagination + 1 });

          if (isProduction) {
            set({ result: [...get().result, ...response.data.result] });
          } else {
            const { result } = response.data;
            for (let i = 0; i < result.length; i++) {
              result[i].avatar = faker.image.url();
            }
            set({ result: [...get().result, ...result] });
          }
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
      name: "offai-search",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);

export default useSearchStore;
