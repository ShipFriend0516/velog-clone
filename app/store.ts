import { create } from "zustand";

declare global {
  interface AuthState {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
  }
}

const useStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useStore;
