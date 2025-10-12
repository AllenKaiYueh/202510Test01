"use client";
import React, { useState, useEffect  } from "react";
import { useRouter } from 'next/navigation';

export default function DataList({ keyword }: { keyword: string }) {
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState<DataItem[]>([]);
  const [pageNow, setPageNow] = useState(1);
  const [pageSingleLimit, setPageSingleLimit] = useState(2);
  const [pageAll, setPageAll] = useState(1);
  const [showPrew, setShowPrew] = useState(false);
  const [showNext, setShowNext] = useState(false);

  interface DataItem {
    id: number;
    title: string;
    created_at?: string;
    [key: string]: any;
  }

  const router = useRouter();

  useEffect(() => {
    fetch('/list/api/', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setData(json)
        page(json)
      })
      .catch(error => console.error('API 錯誤:', error))
  }, [refresh])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/list/api/', {
        method: 'POST',
        body: JSON.stringify({ title: keyword }),
      })
        .then(response => response.json())
        .then(json => {
          setData(json)
          page(json)
        })
        .catch(error => console.error('API 錯誤:', error))
    }, 2000);

    return () => clearTimeout(timer);
  }, [keyword])

  function handleDelete(event: React.MouseEvent<HTMLDivElement>): void {
    const idStr = (event.currentTarget as HTMLDivElement).id.replace(/^Delete/, '');
    const id = Number(idStr);

    if (!Number.isFinite(id)) {
        return;
    } else {
        let userConfirmed = confirm("確定刪除?");

        if (userConfirmed) {
            deleteData(id)
        }
    }
  }

  async function deleteData(id : number) {
    const response = await fetch('/delete/api/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    
    const result = await response.json();

    if (result.message === 'Delete successful') {
        setRefresh(refresh+1)
        alert("刪除成功");
    }
  }

  function handleEdit(event: React.MouseEvent<HTMLDivElement>): void {
    const idStr = (event.currentTarget as HTMLDivElement).id.replace(/^Edit/, '');
    const id = Number(idStr);

    if (!Number.isFinite(id)) {
        return;
    } else {
        editData(id)
    }
  }

  function editData(id : number) {
    router.push('/edit' + `?id=${id}`);
  }

  function page(tableData: DataItem[]) {
    sessionStorage.setItem("tableDate", JSON.stringify(tableData));

    let countPage = Math.ceil(tableData.length / pageSingleLimit);
    let nowPage = pageNow;
    setPageAll(countPage);

    if (nowPage == 0 && tableData.length > 0) {
      nowPage = 1;
      setPageNow(1);
    }

    if (countPage > 1 && nowPage < countPage) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }

    if (countPage == 0) {
      setPageNow(0);
      setShowPrew(false);
    }

    const displayData = tableData.slice((nowPage - 1) * pageSingleLimit, nowPage * pageSingleLimit);
    setData(displayData);
  }

  async function handlePrew() {
    const tableData = JSON.parse(sessionStorage.getItem("tableDate") || '[]');

    let countPage = Math.ceil(tableData.length / pageSingleLimit);
    let prewPage = pageNow - 1;

    setPageAll(countPage);

    if (countPage > 1) {
      if (prewPage > 1) {
        setPageNow(prewPage);
        setShowPrew(true);
      } else if (prewPage == 1 ) {
        setPageNow(1);
        setShowPrew(false);
      }
    } else {
        setPageNow(1);
        setShowPrew(false);
    }

    if (countPage > 1 && prewPage < countPage) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }

    const displayData = tableData.slice((prewPage - 1) * pageSingleLimit, prewPage * pageSingleLimit);
    setData(displayData);
  }

  async function handleNext() {
    const tableData = JSON.parse(sessionStorage.getItem("tableDate") || '[]');

    let countPage = Math.ceil(tableData.length / pageSingleLimit);
    let nextPage = pageNow + 1;
  
    setPageAll(countPage);

    if (countPage > 1 && nextPage < countPage) {
      setPageNow(nextPage);
      setShowNext(true);
      setShowPrew(true);
    } else if (countPage > 1 && nextPage === countPage) {
      setPageNow(nextPage);
      setShowNext(false);
      setShowPrew(true);
    }

    const displayData = tableData.slice((nextPage - 1) * pageSingleLimit, nextPage * pageSingleLimit);
    setData(displayData);
  }

  return (
    <div>
      <table className="table-auto border-collapse border border-gray-400">
          <thead>
              <tr>
              <th className="border border-gray-300 dark:border-gray-600 w-20"></th>
              <th className="border border-gray-300 dark:border-gray-600 w-96 bg-cyan-500">標題</th>
              <th className="border border-gray-300 dark:border-gray-600 w-48 bg-cyan-500">作者</th>
              <th className="border border-gray-300 dark:border-gray-600 w-40 bg-cyan-500">建立時間</th>
              </tr>
          </thead>
          <tbody>
              {data.map((item, index) => {
              return (
                  <tr key={item.id ?? index}>
                      <td className="border border-gray-300 dark:border-gray-600 w-20">
                          <div className="w-5 h-5 bg-pink-200 rounded-sm pl-1 cursor-pointer" id={`Delete${String(item.id)}`}
                          onClick={handleDelete}>X</div>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 w-96">
                        <div className='hover:bg-sky-200 cursor-pointer' id={`Edit${String(item.id)}`} onClick={handleEdit}>{item.title}</div>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 w-48">ABCD</td>
                      <td className="border border-gray-300 dark:border-gray-600 w-40">{item.created_at?.substring(0,10)}</td>
                  </tr>
              )
              })}
          </tbody>
      </table>
      <span id="prew" className={`cursor-pointer ${showPrew ? '' : 'hidden'}`} onClick={handlePrew}> [&lt;] </span>
      <span>{pageNow} /({pageAll}) </span>
      <span id="next" className={`cursor-pointer ${showNext ? '' : 'hidden'}`} onClick={handleNext}> [&gt;] </span>
    </div>
  )
}