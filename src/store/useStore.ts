import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface AppState {
  // Counter state
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void

  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Theme state
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Counter state
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
        decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
        reset: () => set({ count: 0 }, false, 'reset'),

        // User state
        user: null,
        setUser: (user) => set({ user }, false, 'setUser'),

        // Theme state
        theme: 'light',
        toggleTheme: () =>
          set(
            (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
            false,
            'toggleTheme'
          ),
      }),
      {
        name: 'app-storage', // unique name
        partialize: (state) => ({ theme: state.theme, user: state.user }), // only persist these
      }
    ),
    {
      name: 'app-store', // name for devtools
    }
  )
) 