export interface SubTransaction {
  id: string
  date: string // تاریخ واریز
  amountUSD: number
  amountIRR?: number
  description: string
  daysRemaining: number // روزهای باقی مانده تا پایان ماه
  calculatedProfit: number // سود محاسبه شده برای این واریز
  profitRate: number // درصد سود برای این واریز
  exchangeRate: number // نرخ تبدیل برای این واریز
}

export interface ProfitHistory {
  row: number
  date: string // تاریخ شمسی (ماه)
  profitSplit: string // "70/30" یا "80/20"
  totalProfitPercent: string // میانگین درصد سود
  totalProfitUSD: number // مجموع سود کل
  userProfitUSD: number // مجموع سود کاربر (براساس profitSplit)
  userProfitIRR: number // مجموع سود کاربر به تومان
  averageExchangeRate: number // میانگین نرخ تبدیل
  receivedProfitIRR: number
  receivedProfitUSD: number
  newBalanceUSD: number // موجودی جدید دلاری
  newBalanceIRR?: number // موجودی جدید تومانی
  description: string
  subTransactions: SubTransaction[] // واریزهای ریز همان ماه
}

// تابع کمکی برای محاسبه مجموع و میانگین
export function calculateMainRowData(subTransactions: SubTransaction[], profitSplit: string): Partial<ProfitHistory> {
  if (subTransactions.length === 0) {
    return {
      totalProfitPercent: "0/0",
      totalProfitUSD: 0,
      userProfitUSD: 0,
      userProfitIRR: 0,
      averageExchangeRate: 0
    }
  }

  // محاسبه مجموع‌ها
  const totalAmountUSD = subTransactions.reduce((sum, sub) => sum + sub.amountUSD, 0)
  const totalProfitUSD = subTransactions.reduce((sum, sub) => sum + sub.calculatedProfit, 0)
  
  // محاسبه میانگین درصد سود
  const averageProfitRate = subTransactions.reduce((sum, sub) => sum + sub.profitRate, 0) / subTransactions.length
  
  // محاسبه میانگین نرخ تبدیل
  const averageExchangeRate = subTransactions.reduce((sum, sub) => sum + sub.exchangeRate, 0) / subTransactions.length
  
  // محاسبه سود کاربر براساس profitSplit
  const splitRatio = parseInt(profitSplit.split('/')[0]) / 100
  const userProfitUSD = totalProfitUSD * splitRatio
  const userProfitIRR = userProfitUSD * averageExchangeRate

  // فرمت کردن درصد سود (مثل "15/40")
  const formattedProfitPercent = `${Math.round(averageProfitRate)}/${Math.round((averageProfitRate % 1) * 100)}`

  return {
    totalProfitPercent: formattedProfitPercent,
    totalProfitUSD,
    userProfitUSD,
    userProfitIRR,
    averageExchangeRate: Math.round(averageExchangeRate)
  }
}

// داده‌های نمونه با ساختار جدید
export const sampleProfitHistory: ProfitHistory[] = [
  {
    row: 1,
    date: "1403/11/01",
    profitSplit: "70/30",
    totalProfitPercent: "15/40",
    totalProfitUSD: 480.02,
    userProfitUSD: 336.00,
    userProfitIRR: 27216000,
    averageExchangeRate: 81000,
    receivedProfitIRR: 0,
    receivedProfitUSD: 0.00,
    newBalanceUSD: 3453.00,
    description: "سود ماهانه",
    subTransactions: [
      {
        id: "1-1",
        date: "1403/11/01",
        amountUSD: 3117,
        description: "موجودی اولیه",
        daysRemaining: 30,
        calculatedProfit: 336.00,
        profitRate: 15.4,
        exchangeRate: 81000
      }
    ]
  },
  {
    row: 2,
    date: "1403/12/01", 
    profitSplit: "70/30",
    totalProfitPercent: "10/30",
    totalProfitUSD: 355.66,
    userProfitUSD: 249.00,
    userProfitIRR: 22908000,
    averageExchangeRate: 92000,
    receivedProfitIRR: 0,
    receivedProfitUSD: 0.00,
    newBalanceUSD: 3702.00,
    newBalanceIRR: 340584000,
    description: "",
    subTransactions: [
      {
        id: "2-1",
        date: "1403/12/01",
        amountUSD: 3453,
        description: "موجودی اول ماه",
        daysRemaining: 30,
        calculatedProfit: 249.00,
        profitRate: 10.3,
        exchangeRate: 92000
      }
    ]
  },
  {
    row: 3,
    date: "1404/01/01",
    profitSplit: "80/20", // تغییر نسبت سود
    totalProfitPercent: "14/20",
    totalProfitUSD: 525.68,
    userProfitUSD: 420.54,
    userProfitIRR: 36156000,
    averageExchangeRate: 98250,
    receivedProfitIRR: 0,
    receivedProfitUSD: 0.00,
    newBalanceUSD: 4122.54,
    newBalanceIRR: 399877500,
    description: "تغییر قرارداد به 80/20",
    subTransactions: [
      {
        id: "3-1",
        date: "1404/01/01",
        amountUSD: 3702,
        description: "موجودی اول ماه",
        daysRemaining: 30,
        calculatedProfit: 420.54,
        profitRate: 14.2,
        exchangeRate: 98250
      }
    ]
  },
  {
    row: 4,
    date: "1404/02/01",
    profitSplit: "80/20",
    totalProfitPercent: "12/15", // میانگین درصد سود
    totalProfitUSD: 413.51, // مجموع سود کل
    userProfitUSD: 413.51, // مجموع سود کاربر
    userProfitIRR: 30299400,
    averageExchangeRate: 83700,
    receivedProfitIRR: 0,
    receivedProfitUSD: 0.00,
    newBalanceUSD: 4536.05,
    newBalanceIRR: 370958400,
    description: "چندین واریز در ماه",
    subTransactions: [
      {
        id: "4-1",
        date: "1404/02/01",
        amountUSD: 4122.54,
        description: "موجودی اول ماه",
        daysRemaining: 30,
        calculatedProfit: 350.00,
        profitRate: 12.0,
        exchangeRate: 83700
      },
      {
        id: "4-2", 
        date: "1404/02/15",
        amountUSD: 1000,
        description: "واریز میانه ماه",
        daysRemaining: 15, // 15 روز باقی مانده
        calculatedProfit: 63.51, // سود برای 15 روز
        profitRate: 12.7, // درصد سود متفاوت
        exchangeRate: 83700
      }
    ]
  }
]