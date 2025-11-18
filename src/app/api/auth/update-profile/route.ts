import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { userId, username, name, currentPassword, newPassword } = await request.json()

        if (!userId) {
            return NextResponse.json(
                { error: 'کاربر مشخص نشده است' },
                { status: 400 }
            )
        }

        // پیدا کردن کاربر
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'کاربر پیدا نشد' },
                { status: 404 }
            )
        }

        // اگر پسورد جدید می‌خواد، پسورد فعلی رو چک کن
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json(
                    { error: 'برای تغییر رمز عبور، رمز عبور فعلی الزامی است' },
                    { status: 400 }
                )
            }

            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
            if (!isCurrentPasswordValid) {
                return NextResponse.json(
                    { error: 'رمز عبور فعلی اشتباه است' },
                    { status: 401 }
                )
            }
        }

        // بررسی اینکه username جدید تکراری نباشه
        if (username && username !== user.username) {
            const existingUser = await prisma.user.findUnique({
                where: { username }
            })
            if (existingUser) {
                return NextResponse.json(
                    { error: 'این نام کاربری قبلاً استفاده شده است' },
                    { status: 400 }
                )
            }
        }

        // داده‌های آپدیت
        const updateData: any = {}
        if (username) updateData.username = username
        if (name) updateData.name = name
        if (newPassword) updateData.password = await bcrypt.hash(newPassword, 12)

        // آپدیت کاربر
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        })

        // برگرداندن اطلاعات کاربر (بدون پسورد)
        const { password: _, ...userWithoutPassword } = updatedUser

        return NextResponse.json({
            message: 'اطلاعات کاربر با موفقیت به‌روزرسانی شد',
            user: userWithoutPassword
        })

    } catch (error) {
        console.error('Update profile error:', error)
        return NextResponse.json(
            { error: 'خطا در به‌روزرسانی اطلاعات' },
            { status: 500 }
        )
    }
}