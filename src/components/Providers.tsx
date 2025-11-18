"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/store";
//toast 
import { Toaster } from 'react-hot-toast';
//logo logger
import { logLogo } from "../functions/logLogo";
//icons

import { Suspense } from 'react'

interface DescriptionLog {
  version: string;
  origin: string;
  message: string;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLandscape, setIsLandscape] = React.useState(true);
  //log the khodnevis logo
  useEffect(() => {
    const descriptionLog: DescriptionLog = {
      version: '1.0.0',
      origin: window.origin,
      message: 'hello developer!'
    };
    logLogo(descriptionLog);
  }, []);

  useEffect(() => {
    // Function to check if the device is in landscape mode
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      if (window.innerWidth > window.innerHeight) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
    };

    checkOrientation();

    // Add event listener to check orientation on window resize
    window.addEventListener('resize', checkOrientation);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  return (
    <Provider store={store}>
      <Toaster />
      

      <ThemeProvider defaultTheme="light" enableSystem>
        <Suspense>
          {children}
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}