'use client'

interface BalanceCardProps {
  title: string
  amount: number
  currency: 'IRR' | 'USD'
  change?: number
}

export default function BalanceCard({ title, amount, currency, change }: BalanceCardProps) {
  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'IRR') {
      return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان'
    } else {
      return '$' + new Intl.NumberFormat('en-US').format(amount)
    }
  }

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#666' }}>{title}</h3>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
        {formatAmount(amount, currency)}
      </div>
      {change !== undefined && (
        <div style={{ 
          fontSize: '14px', 
          color: change >= 0 ? 'green' : 'red',
          marginTop: '5px'
        }}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      )}
    </div>
  )
}