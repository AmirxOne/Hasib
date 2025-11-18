import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()  // تغییر به username

    if (!username || !password) {
      return NextResponse.json(
        { error: 'نام کاربری و رمز عبور الزامی است' },  // تغییر پیام
        { status: 400 }
      )
    }

    // پیدا کردن کاربر با username
    const user = await prisma.user.findUnique({
      where: { username }  // تغییر به username
    })

    if (!user) {
      return NextResponse.json(
        { error: 'کاربری با این نام کاربری وجود ندارد' },  // تغییر پیام
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

    // برگرداندن اطلاعات کاربر (بدون پسورد)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'لاگین موفقیت‌آمیز بود',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'خطا در سرور' },
      { status: 500 }
    )
  }
}