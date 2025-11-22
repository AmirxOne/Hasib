'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/features/authSlice'
import type { RootState } from '@/store/store'
import BalanceCard from './_components/BalanceCard'
import ProfitHistoryTable from './_components/ProfitHistoryTable'
import { sampleProfitHistory } from '@/types/dashboard'




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
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '100%', margin: '0 auto' }}>
      {/* هدر */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0 }}>دشبورد سرمایه‌گذاری</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            خوش آمدید، {user?.name}!
          </p>
        </div>
        <button 
          onClick={handleLogout}
          disabled={loading}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: loading ? '#ccc' : '#dc3545', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'در حال خروج...' : 'خروج'}
        </button>
      </div>

      {/* کارت‌های موجودی */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <BalanceCard 
          title="موجودی تومانی" 
          amount={566115480} 
          currency="IRR" 
          change={5.2}
        />
        <BalanceCard 
          title="موجودی دلاری" 
          amount={8427.23} 
          currency="USD" 
          change={2.1}
        />
        <BalanceCard 
          title="سود این ماه" 
          amount={78535405} 
          currency="IRR" 
        />
        <BalanceCard 
          title="سود کل" 
          amount={385000000} 
          currency="IRR" 
          change={12.5}
        />
      </div>

      {/* جدول تاریخچه کامل */}
      <div style={{ marginBottom: '30px' }}>
        <ProfitHistoryTable data={sampleProfitHistory} />
      </div>

      {/* اقدامات سریع */}
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
        padding: '20px',
        maxWidth: '300px',
        margin: '0 auto'
      }}>
        <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>اقدامات سریع</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button style={{
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            📥 واریز جدید
          </button>
          <button style={{
            padding: '12px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            📤 درخواست برداشت
          </button>
          <button style={{
            padding: '12px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            📊 دریافت گزارش PDF
          </button>
          <button style={{
            padding: '12px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            📋 خروجی Excel
          </button>
        </div>
      </div>
    </div>
  )
}