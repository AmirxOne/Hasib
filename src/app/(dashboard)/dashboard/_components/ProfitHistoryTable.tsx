'use client'

import { useState } from 'react'
import { ProfitHistory } from '@/types/dashboard'

interface ProfitHistoryTableProps {
  data: ProfitHistory[]
}

export default function ProfitHistoryTable({ data }: ProfitHistoryTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (rowNumber: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(rowNumber)) {
      newExpanded.delete(rowNumber)
    } else {
      newExpanded.add(rowNumber)
    }
    setExpandedRows(newExpanded)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatIRR = (amount: number | undefined) => {
    if (!amount) return '-'
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان'
  }

  const formatUSD = (amount: number) => {
    return '$' + formatNumber(amount)
  }

  // محاسبه مجموع مقادیر برای نمایش در ردیف اصلی
  const calculateRowSummary = (item: ProfitHistory) => {
    const totalAmountUSD = item.subTransactions.reduce((sum, sub) => sum + sub.amountUSD, 0)
    const totalDays = item.subTransactions.reduce((sum, sub) => sum + sub.daysRemaining, 0)
    const avgDays = Math.round(totalDays / item.subTransactions.length)
    
    // استخراج تمام تاریخ‌های منحصر به فرد از ساب ردیف‌ها
    const allDates = item.subTransactions.map(sub => sub.date)
    const uniqueDates = [...new Set(allDates)]
    
    return {
      totalAmountUSD,
      avgDays,
      subCount: item.subTransactions.length,
      allDates: uniqueDates
    }
  }

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #eee',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ margin: 0 }}>تاریخچه سود و موجودی</h3>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '1400px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '50px' }}></th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '60px' }}>ردیف</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '150px' }}>تاریخ‌های واریز</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '120px' }}>مجموع موجودی (دلار)</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '80px' }}>نسبت سود</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '80px' }}>میانگین درصد سود</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '100px' }}>مجموع سود کل</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '100px' }}>سهم کاربر (دلار)</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '120px' }}>سهم کاربر (تومان)</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '100px' }}>میانگین نرخ تبدیل</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '120px' }}>سود دریافتی تومانی</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '120px' }}>سود دریافتی دلار</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '120px' }}>موجودی جدید دلاری</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '120px' }}>موجودی جدید تومانی</th>
              <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', width: '150px' }}>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const summary = calculateRowSummary(item)
              
              return (
                <>
                  {/* ردیف اصلی - نمایش مجموع و میانگین */}
                  <tr key={`main-${item.row}`} style={{ 
                    borderBottom: '1px solid #eee', 
                    backgroundColor: expandedRows.has(item.row) ? '#f8f9fa' : 'white',
                    fontWeight: 'bold'
                  }}>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {item.subTransactions.length > 1 && (
                        <button
                          onClick={() => toggleRow(item.row)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: '#666'
                          }}
                        >
                          {expandedRows.has(item.row) ? '▼' : '▶'}
                        </button>
                      )}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>{item.row}</td>
                    
                    {/* ستون تاریخ‌ها */}
                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                      <div style={{ fontFamily: 'monospace' }}>
                        {/* اگر فقط یک تاریخ داره، همان رو نمایش بده */}
                        {summary.allDates.length === 1 ? (
                          <div>{summary.allDates[0]}</div>
                        ) : (
                          // اگر چندین تاریخ داره، همه رو نمایش بده
                          <div>
                            <div style={{ marginBottom: '4px' }}>
                              {summary.allDates.slice(0, 2).join(' - ')}
                            </div>
                            {summary.allDates.length > 2 && (
                              <div style={{ fontSize: '12px', color: '#666' }}>
                                + {summary.allDates.length - 2} تاریخ دیگر
                              </div>
                            )}
                          </div>
                        )}
                        {summary.subCount > 1 && (
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            ({summary.subCount} واریز)
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatUSD(summary.totalAmountUSD)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontFamily: 'monospace' }}>
                      {item.profitSplit}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontFamily: 'monospace' }}>
                      {item.totalProfitPercent}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatUSD(item.totalProfitUSD)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatUSD(item.userProfitUSD)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatIRR(item.userProfitIRR)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatNumber(item.averageExchangeRate)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatIRR(item.receivedProfitIRR)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatUSD(item.receivedProfitUSD)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatUSD(item.newBalanceUSD)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left', fontSize: '14px' }}>
                      {formatIRR(item.newBalanceIRR)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', color: '#666' }}>
                      {item.description}
                    </td>
                  </tr>

                  {/* ساب ردیف‌ها - نمایش جزئیات */}
                  {expandedRows.has(item.row) && item.subTransactions.map((sub, index) => (
                    <tr key={`sub-${item.row}-${sub.id}`} style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #eee' }}>
                      <td colSpan={2} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '13px', color: '#666' }}>
                        📅 {sub.date} - {sub.description}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontSize: '13px', color: '#666', fontFamily: 'monospace' }}>
                        {sub.date}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'left', fontSize: '13px' }}>
                        {formatUSD(sub.amountUSD)}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontSize: '13px', color: '#666' }}>
                        {sub.daysRemaining} روز
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontSize: '13px', color: '#666' }}>
                        {sub.profitRate}%
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'left', fontSize: '13px' }}>
                        {formatUSD(sub.calculatedProfit)}
                      </td>
                      <td colSpan={8} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '13px', color: '#666' }}>
                        نرخ تبدیل: {formatNumber(sub.exchangeRate)}
                        {index === item.subTransactions.length - 1 && (
                          <span style={{ marginRight: '20px', color: '#28a745', fontWeight: 'bold' }}>
                            ✅ مجموع ماه: {formatUSD(item.userProfitUSD)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}