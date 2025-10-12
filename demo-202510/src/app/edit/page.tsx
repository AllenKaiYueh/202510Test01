"use client";
import { checkLogin } from '../../components/checkLogin'
import Layout from '../../components/layout';
import React, { useState, useEffect  } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function Edit() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  checkLogin();
 
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    if (name === "title" && value.length >= 0) {
      setInputTitle(value);
    } else if (name === "content" && value.length >= 0) {
      setInputContent(value);
    }
  }

  const handleSubmit = () => {
    if (inputTitle.length > 0 && inputContent.length > 0) {
        sendData();
    } else {
        alert("資料填寫不正確");
    }
  }

  async function getData(id : string) {
    const response = await fetch('/edit/api/?id=' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    setInputTitle(result[0].title);
    setInputContent(result[0].content);
  }

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  async function sendData() {
    const response = await fetch('/edit/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, title: inputTitle, content: inputContent }),
    });
 
    const result = await response.json();

    if (result.message !== 'Update successful') {
      alert("更新失敗");
    } else {
      alert("更新成功");
      router.push('/list');
    }
  }

    return (
      <Layout>
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <table className="table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 w-20 h-10 bg-cyan-500">標題</td>
                  <td className="border border-gray-300 dark:border-gray-600 w-120">
                      <input
                          type="text"
                          id="title"
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none sm:text-sm dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
                          name="title"
                          value={inputTitle}
                          onChange={handleChange}
                      />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 w-20 h-10 bg-cyan-500">內容</td>
                  <td className="border border-gray-300 dark:border-gray-600 w-120">
                      <textarea
                          id="myTextarea"
                          name="content"
                          value={inputContent}
                          rows={5}
                          cols={50}
                          onChange={handleChange}
                      />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="w-15 h-10 bg-green-200 rounded-sm pt-2 pl-3 cursor-pointer" onClick={handleSubmit}>更新</div>
          </main>
        </div>
      </Layout>
    );
}