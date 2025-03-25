"use client"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../../redux/store/actions";
import { ActionTypes } from "../../redux/store/reducer";
import { RootState } from "../../redux/store/store";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  text: string;
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
      payload: { id: uuidv4(), text },
    });
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
      setEditingId(null);
      setEditText("");
    }
  };

  return (
<div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4 ">
  <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
    <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">CRUD Application</h1>

    {/* Add Item */}
    <div className="flex items-center gap-3 mb-5">
      <input
        type="text"
        className="w-full border text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        placeholder="Enter item..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
    <div className="space-y-3">
      {items.map((item: Item) => (
        <div key={item.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm ">
          {editingId === item.id ? (
            <input
              type="text" 
              className="flex-grow border text-black border-gray-300 rounded-lg p-1 w-[90%] outline-none transition-all mr-5"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span className="text-gray-700 font-medium">{item.text}</span>
          )}

          <div className="flex gap-2">
            {editingId === item.id ? (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1 rounded-lg transition-all"
                onClick={handleUpdate}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-3 py-1 rounded-lg transition-all"
                onClick={() => handleEdit(item.id, item.text)}
              >
                Edit
              </button>
            )}

            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded-lg transition-all"
              onClick={() => dispatch(deleteItem(item.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}
