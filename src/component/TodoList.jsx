import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

let TodoList = ({ getData, setGetData, getTodoData, handleEdit }) => {
  let handleDelete = async (e) => {
    try {
      await axios.delete(
        `https://eff31cda-e7f1-47d7-b1d0-1ae80320101d-00-11k0sbsactxpk.pike.replit.dev:8000/todos/${e.id}`,
      );
      getTodoData();
      toast.success(`${e.task} Deleted Successfully`);
    } catch (err) {
      toast.error(err.message);
    }
  };
  let handleSave = (id) => {
    setGetData(
      getData.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)),
    );
  };
  return (
    <>
      <div className="w-full space-y-3 pt-3">
        {getData.map((e) => {
          return (
            <div
              key={e.id}
              className={`${e.completed ? "completedTodo" : "bg-regalBlue"} w-full py-3 px-4 rounded flex items-center justify-between font-bold text-2xl text-white max-sm:text-xl max-xs:flex-wrap max-xs:gap-2`}
            >
              <p>{e.task}</p>
              <div className="flex gap-4 max-xs:gap-1.5 max-xs:text-base">
                <FaEdit
                  className="hover:text-green-500 duration-500"
                  onClick={() => handleEdit(e.id)}
                />
                <FaTrash
                  className="hover:text-red-500 duration-500"
                  onClick={() => handleDelete(e)}
                />
                <FaCheck
                  className={`${e.completed ? "hover:text-red-500" : "hover:text-green-500"} duration-500`}
                  onClick={() => handleSave(e.id)}
                />
              </div>
            </div>
          );
        })}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};
export default TodoList;
