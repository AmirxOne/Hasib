import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from './lib/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Routes that require authentication
  const protectedRoutes = ['/dashboard', '/api/transactions', '/api/users']

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('accessToken')?.value

    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      verifyAccessToken(accessToken)
    } catch (error) {
      console.log('🔄 Access token expired, trying refresh...')
      
      // سعی کن token رو refresh کنی
      const refreshToken = request.cookies.get('refreshToken')?.value
      
      if (refreshToken) {
        try {
          // درخواست refresh token
          const refreshResponse = await fetch(new URL('/api/auth/refresh', request.url), {
            method: 'POST',
            headers: {
              'Cookie': request.headers.get('cookie') || ''
            }
          })

          if (refreshResponse.ok) {
            // اگر refresh موفق بود، ادامه بده
            return NextResponse.next()
          }
        } catch (refreshError) {
          console.log('❌ Refresh failed')
        }
      }

      // اگر refresh هم کار نکرد، به login برگرد
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/transactions/:path*',
    '/api/users/:path*'
  ]
}