import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { IUser } from "@/types/interfaces";
import {
  removeLocalAccessToken,
  removeLocalRefreshToken,
  setLocalAccessToken,
  setLocalRefreshToken
} from "@/lib/auth";
import { toastError, toastSuccess } from "@/lib/toast";
import { USER_ROLES } from "@/utils/constants";
import {
  apiLogin,
  apiLogout,
  apiRegister,
  apiChangePassword,
  apiUpdatePersonal,
  apiUpdateFan
} from "@/api/Auth";

interface IAuthState {
  hasHydrated: boolean;
  loading: boolean;
  role: string;
  signupStage: number;
  signupTotalStage: number;
  user: IUser | null;

  setHasHydrated: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setRole: (payload: string) => void;
  setSignupStage: (payload: number) => void;
  setUser: (payload: any) => void;

  loginAction: (data: any, router: AppRouterInstance) => void;
  logoutAction: (router: AppRouterInstance) => void;
  registerAction: (data: any, router: AppRouterInstance) => void;

  updatePersonalAction: (data: any) => void;
  updateFanAction: (data: any) => void;
  changePasswordAction: (data: any) => void;
}

const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      loading: false,
      role: USER_ROLES.CUSTOMER,
      signupStage: 1,
      signupTotalStage: 2,
      user: {
        role: USER_ROLES.CUSTOMER
      },

      setHasHydrated: (payload: boolean) => set({ hasHydrated: payload }),
      setLoading: (payload: boolean) => set({ loading: payload }),
      setRole: (payload: string) => {
        set((state: IAuthState) => ({
          role: payload,
          user: { ...state.user, role: payload }
        }));

        if (payload === USER_ROLES.CUSTOMER) {
          set({ signupTotalStage: 2 });
        } else {
          set({ signupTotalStage: 4 });
        }
      },
      setSignupStage: (payload: number) => set({ signupStage: payload }),
      setUser: (payload: any) =>
        set((state: IAuthState) => ({
          user: { ...state.user, ...payload }
        })),

      loginAction: async (data: any, router: AppRouterInstance) => {
        try {
          set({ loading: true });
          const response = await apiLogin(data);

          if (response && response.data) {
            const { user, accessToken, refreshToken, msg } = response.data;
            setLocalAccessToken(accessToken);
            setLocalRefreshToken(refreshToken);
            set({ user });
            set({ role: user.role });
            toastSuccess(msg);
            router.push("/search");
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
      },

      logoutAction: async (router: AppRouterInstance) => {
        try {
          set({ loading: true });
          await apiLogout();
          removeLocalAccessToken();
          removeLocalRefreshToken();
          set({ user: { role: USER_ROLES.CUSTOMER } });
          router.push("/signin");
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

      registerAction: async (data: any, router: AppRouterInstance) => {
        try {
          set({ loading: true });
          const response = await apiRegister(data);

          if (response && response.data) {
            const { msg } = response.data;
            toastSuccess(msg);
            set({ signupStage: 1 });
            router.push("/signin");
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
      },

      updatePersonalAction: async (data: any) => {
        try {
          set({ loading: true });
          const response = await apiUpdatePersonal(data);

          if (response && response.data) {
            const { user, msg } = response.data;
            set({ user });
            toastSuccess(msg);
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
      },

      updateFanAction: async (data: any) => {
        try {
          set({ loading: true });
          const response = await apiUpdateFan(data);

          if (response && response.data) {
            const { user, msg } = response.data;
            set({ user });
            toastSuccess(msg);
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
      },

      changePasswordAction: async (data: any) => {
        try {
          set({ loading: true });
          const response = await apiChangePassword(data);

          if (response && response.data) {
            const { msg } = response.data;
            toastSuccess(msg);
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
      name: "offai-auth",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);

export default useAuthStore;
