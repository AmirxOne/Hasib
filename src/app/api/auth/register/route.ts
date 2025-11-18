import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password, name, role = 'INVESTOR' } = await request.json()

    if (!username || !password || !name) {
      return NextResponse.json(
        { error: 'نام کاربری، رمز عبور و نام الزامی است' },
        { status: 400 }
      )
    }

    // بررسی اینکه کاربر وجود نداره
    const existingUser = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'این نام کاربری قبلاً استفاده شده است' },
        { status: 400 }
      )
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 12)

    // ایجاد کاربر
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role: role as any
      }
    })

    // برگرداندن اطلاعات کاربر (بدون پسورد)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'کاربر با موفقیت ایجاد شد',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'خطا در ایجاد کاربر' },
      { status: 500 }
    )
  }
}