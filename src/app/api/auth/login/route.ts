import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken, type TokenPayload } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'نام کاربری و رمز عبور الزامی است' },
        { status: 400 }
      )
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'کاربری با این نام کاربری وجود ندارد' },
        { status: 401 }
      )
    }

    // بررسی رمز عبور
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'رمز عبور اشتباه است' },
        { status: 401 }
      )
    }

    // تولید توکن‌ها
    const tokenPayload: TokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role as 'ADMIN' | 'INVESTOR'
    }

    const accessToken = generateAccessToken(tokenPayload)
    const refreshToken = generateRefreshToken(tokenPayload)

    // ذخیره refresh token در دیتابیس
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        refreshToken: refreshToken,
        lastLogin: new Date()
      }
    })

    // ایجاد response
    const response = NextResponse.json({
      message: 'لاگین موفقیت‌آمیز بود',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    })

    // تنظیم HttpOnly cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 ساعت (به ثانیه)
    })

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 روز (به ثانیه)
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'خطا در سرور' },
      { status: 500 }
    )
  }
}