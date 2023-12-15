import React, { useState, useCallback, useEffect } from "react";
import Pagination from "./Pagination";
const ITEMS_PER_PAGE = 10;

const MainAdmin = () => {
  const initialData = [
    {
      id: 1,
      name: "Alice",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 2,
      name: "Bob",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 3,
      name: "Sang",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 4,
      name: "Hong",
      nickname: "holymoly",
      provider: "local",
      createdAt: "2000/00/00",
    },
    {
      id: 6,
      name: "Popo",
      nickname: "holymoly",
      provider: "local",
      createdAt: "2000/00/00",
    },
    {
      id: 7,
      name: "Popo",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 8,
      name: "Popo",
      nickname: "holymoly",
      provider: "github",
      createdAt: "2000/00/00",
    },
    {
      id: 9,
      name: "Popo",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 10,
      name: "Popo",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 11,
      name: "Popo",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 12,
      name: "Popo",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 13,
      name: "Popo",
      nickname: "holymoly",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 14,
      name: "Sam",
      nickname: "das",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 15,
      name: "John",
      nickname: "qwe",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 16,
      name: "John2",
      nickname: "asd",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 17,
      name: "John3",
      nickname: "qwc",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 18,
      name: "John4",
      nickname: "gr",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 19,
      name: "John5",
      nickname: "tje",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 20,
      name: "John6",
      nickname: "ut",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 21,
      name: "John7",
      nickname: "53y",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 22,
      name: "John8",
      nickname: "hte",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 23,
      name: "John9",
      nickname: "qwe",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 24,
      name: "John10",
      nickname: "qwe",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 25,
      name: "John11",
      nickname: "qwe",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
    {
      id: 26,
      name: "John12",
      nickname: "qwe",
      provider: "kakao",
      createdAt: "2000/00/00",
    },
  ];
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);

  //   useEffect(() => {
  //     const storedData = JSON.parse(localStorage.getItem("userInfo")) || [];
  //     setTableData(storedData);
  //   }, []);

  useEffect(() => {
    const lastPage = Math.ceil(initialData.length / ITEMS_PER_PAGE);
    setTotalPage(lastPage ? lastPage : 1);
    console.log(initialData);
  }, []);

  //   const handleInSearch = useCallback((result) => {
  //     setTableData(result);
  //   }, []);

  const currentPageData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const dataProps = {
    columns: ["ID", "Name", "Nickname", "provider", "Created-at"],
    rows: currentPageData.map((row) => [
      row.id,
      row.name,
      row.nickname,
      row.provider,
      row.createdAt,
    ]),
  };

  const toggleSelectRow = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== rowId)
      );
    } else {
      setSelectedRows((prevSelected) => [...prevSelected, rowId]);
    }
  };

  const deleteSelectedRows = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the selected items?"
    );
    if (confirmDelete) {
      alert("Success");
      setTableData((prevData) =>
        prevData.filter((row) => !selectedRows.includes(row.id))
      );
      setSelectedRows([]);
    } else {
      return false;
    }
  };

  return (
    <div className="w-[100%] h-[700px] flex flex-col justify-center items-center">
      <table className="border w-[1100px] h-[400px]">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(currentPageData.map((row) => row.id));
                  } else {
                    setSelectedRows([]);
                  }
                }}
                checked={selectedRows.length === currentPageData.length}
              />
            </th>
            {dataProps.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataProps.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleSelectRow(row[0])}
                  checked={selectedRows.includes(row[0])}
                />
              </td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="text-center border hover:bg-sky-400 my-8">
        <button
          onClick={deleteSelectedRows}
          disabled={selectedRows.length === 0}
          className=" p-2"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default MainAdmin;
