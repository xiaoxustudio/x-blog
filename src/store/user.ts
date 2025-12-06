import type { IUser } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
	token: string;
	user: IUser | null;
}
interface UserStateActions {
	setToken: (token: string) => void;
	setUser: (user: IUser) => void;
}

const useUser = create<UserState & UserStateActions>()(
	persist(
		(set) => ({
			token: "",
			user: null,
			setToken: (token: string) => set(() => ({ token })),
			setUser: (user: IUser) => set(() => ({ user }))
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage)
		}
	)
);
export default useUser;
