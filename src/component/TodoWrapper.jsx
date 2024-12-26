import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TodoForm from "../component/TodoForm";
import TodoList from "../component/TodoList";

let TodoWrapper = () => {
  let [getData, setGetData] = useState([]);
  let [editId, setEditId] = useState(null);
  let [editData, setEditData] = useState(false);
  let [inputData, setInputData] = useState("");

  let handleEdit = (e) => {
    try {
      let findId = getData.find((i) => i.id === e);
      setInputData(findId.task);
      setEditId(e);
      setEditData(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  let getTodoData = async () => {
    try {
      let res = await axios.get(
        "https://eff31cda-e7f1-47d7-b1d0-1ae80320101d-00-11k0sbsactxpk.pike.replit.dev:8000/todos",
      );
      setGetData(res?.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  let [filterData, setFilterData] = useState([]);
  let handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let fil = getData.filter((i) => i.task.toLowerCase().includes(value));

    setFilterData(fil);
  };

  return (
    <>
      <div className="bg-regalBlue h-screen flex items-center justify-center max-sm:py-6 max-sm:h-full">
        <div className=" flex flex-col items-center w-1/2 bg-pink-300 py-8 px-10 rounded-md space-y-4 max-lg:w-3/4 max-xs:px-2">
          <h1 className="font-bold text-4xl text-center max-sm:text-3xl max-xs:text-2xl">Get Things Done!</h1>
          <TodoForm
            inputData={inputData}
            setInputData={setInputData}
            getTodoData={getTodoData}
            editData={editData}
            setEditData={setEditData}
            editId={editId}
            setEditId={setEditId}
            handleSearch={handleSearch}
          />
          <TodoList
            getData={filterData.length > 0 ? filterData : getData}
            setGetData={setGetData}
            getTodoData={getTodoData}
            handleEdit={handleEdit}
            filterData={filterData}
          />
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};
export default TodoWrapper;
