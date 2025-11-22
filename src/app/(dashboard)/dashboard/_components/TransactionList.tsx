'use client'

interface Transaction {
  id: string
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'PROFIT'
  amount: number
  currency: 'IRR' | 'USD'
  description: string
  date: string
}

interface TransactionListProps {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DEPOSIT': return 'green'
      case 'PROFIT': return 'blue'
      case 'WITHDRAWAL': return 'red'
      default: return 'gray'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'DEPOSIT': return 'واریز'
      case 'PROFIT': return 'سود'
      case 'WITHDRAWAL': return 'برداشت'
      default: return type
    }
  }

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: 'white',
      padding: '20px'
    }}>
      <h3 style={{ margin: '0 0 15px 0' }}>آخرین تراکنش‌ها</h3>
      {transactions.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          هیچ تراکنشی یافت نشد
        </div>
      ) : (
        <div>
          {transactions.map((transaction) => (
            <div key={transaction.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>
                  {getTypeText(transaction.type)}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {transaction.description}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(transaction.date).toLocaleDateString('fa-IR')}
                </div>
              </div>
              <div style={{
                color: getTypeColor(transaction.type),
                fontWeight: 'bold'
              }}>
                {transaction.currency === 'IRR' ? 
                  new Intl.NumberFormat('fa-IR').format(transaction.amount) + ' تومان' :
                  '$' + transaction.amount.toLocaleString()
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}