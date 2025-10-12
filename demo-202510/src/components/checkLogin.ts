"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function checkLogin() {
    const router = useRouter()

    useEffect(() => {
        const localUserData = localStorage.getItem('userData');

        if (localUserData) {
            let userData = JSON.parse(localUserData);

            if (userData.email.length > 0 && userData.id.length > 0) {
                
            } else {
                router.push('/')
            }
        } else {
            router.push('/')
        }
    }, [])
}