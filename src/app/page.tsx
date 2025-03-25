"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../../redux/store/actions";
import { ActionTypes } from "../../redux/store/reducer";
import { RootState } from "../../redux/store/store";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Item {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch({
        type: ActionTypes.ADD_ITEM,
        payload: { id: uuidv4(), text, completed: false },
      });
      toast.success("Task added!", { position: "top-center" });
      setText("");
    }
  };

  const handleEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleUpdate = () => {
    if (editText.trim() && editingId !== null) {
      dispatch(updateItem(editingId, editText));
      toast.info("Task updated!", { position: "top-center" });
      setEditingId(null);
      setEditText("");
    }
  };

  const toggleComplete = (id: string) => {
    dispatch({ type: ActionTypes.TOGGLE_COMPLETE, payload: id });
  };

  return (
    <div className="w-full min-h-screen flex justify-center  p-4 bg-gray-100">
      <motion.div
        className="w-[45%] bg-white p-6 rounded-xl shadow-lg border border-gray-200 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage:
            "linear-gradient(transparent 95%, rgba(0, 0, 0, 0.05) 5%)",
          backgroundSize: "100% 30px",
        }}
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
           What do you have planned for today ?
        </h1>

        {/* Add Item */}
        <div className="flex items-center gap-3 mb-5">
          <input
            type="text"
            className="w-full border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all bg-white"
            placeholder="Enter task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
            onClick={handleAdd}
          >
            Add
          </motion.button>
        </div>

        {/* Todo Items */}
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item: Item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between bg-white border border-gray-300 p-3 rounded-lg shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="w-5 h-5 accent-green-500 cursor-pointer mr-5"
                />

                {editingId === item.id ? (
                  <input
                    type="text"
                    className="flex-grow border text-black border-gray-300 rounded-lg p-1 w-[90%] outline-none transition-all mr-5"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span
                    className={`text-gray-700 font-medium flex-grow ${
                      item.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                )}

                <div className="flex gap-2">
                  {editingId === item.id ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1 rounded-lg transition-all"
                      onClick={handleUpdate}
                    >
                      Save
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-3 py-1 rounded-lg transition-all"
                      onClick={() => handleEdit(item.id, item.text)}
                    >
                      Edit
                    </motion.button>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded-lg transition-all"
                    onClick={() => {
                      dispatch(deleteItem(item.id));
                      toast.error("Task deleted!", { position: "top-center" });
                    }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
