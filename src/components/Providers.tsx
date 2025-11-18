"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
// toast 
import { Toaster } from 'react-hot-toast';
// logo logger
import { logLogo } from "../functions/logLogo";
// icons
import { Suspense } from 'react'
import { checkAuth } from "@/store/features/authSlice";

interface DescriptionLog {
  version: string;
  origin: string;
  message: string;
}

// کامپوننت جداگانه برای مدیریت auth
function AuthInitializer() {
  const dispatch = useDispatch()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      // @ts-ignore - چون dispatch تایپ نشده
      dispatch(checkAuth())
    }
  }, [isClient, dispatch])

  return null
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLandscape, setIsLandscape] = React.useState(true);
  const [isMounted, setIsMounted] = useState(false)
  
  // log the khodnevis logo
  useEffect(() => {
    const descriptionLog: DescriptionLog = {
      version: '1.0.0',
      origin: window.origin,
      message: 'hello developer!'
    };
    logLogo(descriptionLog);
    setIsMounted(true)
  }, []);

  // تا زمانی که کامپوننت mount نشده، چیزی رندر نکن
  if (!isMounted) {
    return (
      <Provider store={store}>
        <div style={{ display: 'none' }}>Loading...</div>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <AuthInitializer />
      <Toaster />
      
      <ThemeProvider defaultTheme="light" enableSystem>
        <Suspense>
          {children}
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}