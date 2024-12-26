import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

let TodoForm = ({
  getTodoData,
  editData,
  editId,
  setEditId,
  setEditData,
  inputData,
  setInputData,
  handleSearch,
}) => {
  let handleForm = async (e) => {
    e.preventDefault();
    if (editData) {
      try {
        await axios.put(
          `https://eff31cda-e7f1-47d7-b1d0-1ae80320101d-00-11k0sbsactxpk.pike.replit.dev:8000/todos/${editId}`,
          { task: inputData, completed: false },
        );
        toast.success("Todo Updated Successfully");
        setEditData(false);
        setEditId(null);
        setInputData("");
        getTodoData();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        await axios.post(
          "https://eff31cda-e7f1-47d7-b1d0-1ae80320101d-00-11k0sbsactxpk.pike.replit.dev:8000/todos",
          { task: inputData },
        );
        getTodoData();
        toast.success("Todo Created Successfully ");
        setInputData("");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <div className="w-full">
        <form
          onSubmit={handleForm}
          className="w-full flex justify-between gap-4 font-semibold max-sm:flex-col "
        >
          <input
            name="todoValue"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-[40%] ps-2 py-2.5 outline-none max-sm:w-full "
            type="text"
            placeholder="What is the task today?"
          />
          <button className="w-[20%] text-white bg-regalBlue max-sm:w-full max-sm:py-2.5">
            Add Task
          </button>
          <input
            onChange={(e) => handleSearch(e)}
            className="w-[40%] ps-2 py-2.5 outline-none max-sm:w-full"
            type="search"
            placeholder="Search todo here..."
          />
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};
export default TodoForm;
