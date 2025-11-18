import { NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const accessToken = request.headers.get('cookie')
      ?.split('; ')
      ?.find(row => row.startsWith('accessToken='))
      ?.split('=')[1]

    if (!accessToken) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 })
    }

    const decoded = verifyAccessToken(accessToken)
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, name: true, role: true }
    })

    if (!user) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 })
    }

    return NextResponse.json({
      isAuthenticated: true,
      user
    })

  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 200 })
  }
}