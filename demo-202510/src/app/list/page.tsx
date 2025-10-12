"use client";
import { checkLogin } from '../../components/checkLogin'
import Layout from '../../components/layout';
import DataList from '../../components/DataList';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect  } from "react";

export default function List() {
  const [inputSearch, setInputSearch] = useState("");

  checkLogin();
  const router = useRouter();

  const handleClick = () => {
    router.push('/new');
  };

  return (
    <Layout>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex w-full justify-between">
            <div className="w-20 h-10 bg-green-200 rounded-sm pt-2 pl-5 mr-[63%] cursor-pointer" onClick={handleClick}>New</div>
            <input type="text" id="search" name="search" value={inputSearch} 
            onChange={(e) => setInputSearch(e.target.value)} className="border-1 border-solid"/>
          </div>
          <DataList keyword={inputSearch}/>
        </main>
      </div>
    </Layout>
  );
  
}
