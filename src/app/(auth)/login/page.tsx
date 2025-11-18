'use client'

import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { loginUser } from '@/store/features/authSlice'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('admin') // پیش‌فرض برای تست
  const [password, setPassword] = useState('123456') // پیش‌فرض برای تست
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)
  const router = useRouter()

  // اگر کاربر لاگین کرده، به دشبورد برو
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('لاگین با:', { username, password })
    
    const result = await dispatch(loginUser({ username, password }))
    
    if (loginUser.fulfilled.match(result)) {
      console.log('✅ لاگین موفق:', result.payload.user)
    } else {
      console.log('❌ خطای لاگین:', result.error)
    }
  }

  // صفحه خیلی ساده - فقط برای تست منطق
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>ورود به سیستم حسابداری</h1>
      
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: 8, width: 200 }}
          />
        </div>
        
        <div style={{ marginBottom: 10 }}>
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 8, width: 200 }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '8px 16px', backgroundColor: loading ? '#ccc' : '#007acc', color: 'white', border: 'none' }}
        >
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>

        {error && (
          <div style={{ color: 'red', marginTop: 10 }}>
            خطا: {error}
          </div>
        )}

        {user && (
          <div style={{ color: 'green', marginTop: 10 }}>
            ✅ کاربر: {user.name} ({user.role})
          </div>
        )}
      </form>

      <div style={{ marginTop: 20, fontSize: 14, color: '#666' }}>
        <strong>برای تست:</strong><br/>
        کاربری: admin<br/>
        رمز: 123456
      </div>
    </div>
  )
}