'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/features/authSlice'
import type { RootState } from '@/store/store'

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = async () => {
    // @ts-ignore
    await dispatch(logoutUser())
    router.push('/login')
  }

  if (!isAuthenticated) {
    return <div>در حال انتقال به صفحه ورود...</div>
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>دشبورد مدیریت حسابداری</h1>
      
      <div style={{ margin: '20px 0', padding: 15, border: '1px solid #ddd', borderRadius: 5 }}>
        <h2>اطلاعات کاربر</h2>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>نام کاربری:</strong> {user?.username}</p>
        <p><strong>نام:</strong> {user?.name}</p>
        <p><strong>نقش:</strong> {user?.role === 'ADMIN' ? 'مدیر سیستم' : 'سرمایه‌گذار'}</p>
        <p><strong>تاریخ عضویت:</strong> {new Date(user?.createdAt || '').toLocaleDateString('fa-IR')}</p>
      </div>

      <button 
        onClick={handleLogout}
        disabled={loading}
        style={{ 
          marginTop: 20, 
          padding: '8px 16px', 
          backgroundColor: loading ? '#ccc' : '#dc3545', 
          color: 'white', 
          border: 'none' 
        }}
      >
        {loading ? 'در حال خروج...' : 'خروج امن'}
      </button>
    </div>
  )
}