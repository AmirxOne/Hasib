import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { verifyRefreshToken, generateAccessToken, type TokenPayload } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token not found' },
        { status: 401 }
      )
    }

    // verify refresh token
    const decoded = verifyRefreshToken(refreshToken)

    // پیدا کردن کاربر و بررسی refresh token
    const user = await prisma.user.findFirst({
      where: { 
        id: decoded.userId,
        refreshToken: refreshToken
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      )
    }

    // تولید access token جدید
    const tokenPayload: TokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role as 'ADMIN' | 'INVESTOR'
    }

    const newAccessToken = generateAccessToken(tokenPayload)

    // آپدیت response با access token جدید
    const response = NextResponse.json({
      message: 'Token refreshed successfully'
    })

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15 دقیقه
    })

    return response

  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 }
    )
  }
}