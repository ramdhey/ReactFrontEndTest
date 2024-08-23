import { create } from "zustand";

const StoreState = create((set, get) => ({
  register: "",
  setRegister: (register) => set({ register }),
  token: "",
  setToken: (token) => set({ token }),
  tokenAdmin: "",
  setTokenAdmin: (tokenAdmin) => set({ tokenAdmin }),
  role: "",
  setRole: (role) => set({ role }),
  applications: "",
  setApplications: (applications) => set({ applications }),
  profile: "",
  setProfile: (profile) => set({ profile }),

  setLogout: () =>
    set({
      register: "",
      token: "",
      tokenAdmin: "",
      role: "",
      applications: "",
      profile: "",
    }),
}));

export default StoreState;
