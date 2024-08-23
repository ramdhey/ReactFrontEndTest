import { create } from "zustand";

const AdminState = create((set, get) => ({
  token: "",
  setToken: (token) => set({ token }),
  tokenAdmin: "",
  setTokenAdmin: (tokenAdmin) => set({ tokenAdmin }),
  role: "",
  setRole: (role) => set({ role }),
  applicationsAdmin: "",
  setApplicationsAdmin: (applicationsAdmin) => set({ applicationsAdmin }),
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

export default AdminState;
