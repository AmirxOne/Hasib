import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  username: string
  name: string
  role: 'ADMIN' | 'INVESTOR'
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Async thunk برای لاگین
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // اضافه کردن برای ارسال cookies
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'خطا در لاگین')
      }

      return data
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در ارتباط با سرور')
    }
  }
)

// برای refresh token
export const refreshTokens = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include' // مهم: برای ارسال cookies
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'خطا در refresh token')
      }

      return data
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در ارتباط با سرور')
    }
  }
)

// برای لاگ‌اوت
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'خطا در خروج')
      }

      return data
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در ارتباط با سرور')
    }
  }
)

// برای بررسی وضعیت احراز هویت
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })

      const data = await response.json()

      if (data.isAuthenticated) {
        return data
      } else {
        return rejectWithValue('Not authenticated')
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در بررسی وضعیت')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    }
  },
  extraReducers: (builder) => {
    builder
      // لاگین
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      
      // Refresh Token
      .addCase(refreshTokens.pending, (state) => {
        state.loading = true
      })
      .addCase(refreshTokens.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.user = null
      })
      
      // لاگ‌اوت
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        // حتی اگر خطا داشت، کاربر رو لاگ‌اوت کن
        state.user = null
        state.isAuthenticated = false
      })
      
      // بررسی وضعیت احراز هویت
      .addCase(checkAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { logout, clearError, setUser } = authSlice.actions
export default authSlice.reducer