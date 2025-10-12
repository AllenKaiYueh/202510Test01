"use client";

import React, { useState  } from "react";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [isValid, setIsValid] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.type === "password" && event.target.value.length >= 0) {
      setInputPassword(event.target.value);
    }
    if (event.target.type === "email") {
      setIsValid(emailRegex.test(event.target.value));
      setInputEmail(event.target.value);
    }
  }

  const handleLogin = () => {
    if (isValid) {
      sendData();
    } else {
      alert("資料填寫不正確");
    }
  }

  async function sendData() {
    const response = await fetch('/login/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: inputEmail, password: inputPassword }),
    });
    
    const result = await response.json();

    if (result.message === 'Login failed') {
      alert("登入失敗");
    } else {
      localStorage.setItem('userData', JSON.stringify({
        email: result.email,
        id: result.id
      }));

      router.push('/list');
    }
  }

  return (
    <div className="mx-auto max-w-md border-x border-x-gray-200 px-6 py-5 dark:border-x-gray-800 dark:bg-gray-950/10">
      <div className="mt-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <div className="mt-6">
          <input
            type="email"
            id="email"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none sm:text-sm dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
            placeholder="you@example.com"
            name="email"
            value={inputEmail}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <div className="mt-6">
          <input
            type="password"
            id="password"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none sm:text-sm dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
            name="password"
            value={inputPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          className="rounded-md bg-sky-500 px-5 py-2.5 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
