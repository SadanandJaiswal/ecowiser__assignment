import React, { useState } from "react";
import { FaMoon, FaSun, FaSearch, FaPlus } from "react-icons/fa";
import MyModal from "./MyModal";
import { useNoteContext } from "../NoteContext";

const Navbar = () => {
  const { setSelectNote } = useNoteContext();
  const [darkMode, setDarkMode] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);
  // const [selectNote,setSelectedNotes] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleSelectChange = (event) => {
    setSelectNote(event.target.value);
  };

  return (
    <>
      <nav
        className={`bg-white shadow-md w-full py-2 z-10 ${
          darkMode ? "dark bg-gray-800" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="px-4 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md"
                onChange={handleSelectChange}
              >
                <option value="allNotes">All Notes</option>
                <option value="myNotes">My Notes</option>
              </select>
            </div>
          </div>

          <div className="hidden md:block flex border border-blue-500 max-w-[50%]">
            <input
              type="text"
              className="px-4 py-2 border rounded-md placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-white focus:outline-none"
              placeholder="Search..."
            />
            <button className="p-3 border">
              <FaSearch />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-white"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className="px-2 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={openModal}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </nav>

      <MyModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        isUpdate={false}
      />
    </>
  );
};

export default Navbar;
