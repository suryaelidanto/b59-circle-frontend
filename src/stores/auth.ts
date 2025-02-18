import { ProfileEntity } from '@/entities/profile.entity';
import { UserEntity } from '@/entities/user.entity';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserProfile = UserEntity & {
  profile: ProfileEntity;
};

type useAuthStore = {
  user: UserProfile;
  setUser: (payload: UserProfile) => void;
  logout: () => void;
};

export const useAuthStore = create<useAuthStore>()(
  devtools((set) => ({
    user: {} as UserProfile,
    setUser: (payload: UserProfile) =>
      set((state) => ({ user: { ...state.user, ...payload } })),
    logout: () => set(() => ({ user: {} as UserProfile })),
  }))
);
