import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (refreshToken) {
      // پیدا کردن کاربر و حذف refresh token
      const user = await prisma.user.findFirst({
        where: { refreshToken }
      })

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: null }
        })
      }
    }

    // حذف cookies
    const response = NextResponse.json({
      message: 'خروج موفقیت‌آمیز بود'
    })

    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'خطا در خروج' },
      { status: 500 }
    )
  }
}