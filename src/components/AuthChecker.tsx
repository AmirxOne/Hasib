'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from '@/store/features/authSlice'

export default function AuthChecker() {
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(checkAuth())
  }, [dispatch])

  return null // این کامپوننت چیزی رندر نمی‌کنه
}