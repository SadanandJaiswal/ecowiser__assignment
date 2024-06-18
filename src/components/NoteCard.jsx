import React from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { TiPinOutline, TiPin } from "react-icons/ti";
import { updateLocalStorage } from "../utils";
import { useNoteContext } from "../NoteContext";

const NoteCard = ({ time, title, body, category, bg, id, isPinned }) => {
  const { fetchNotes, setIsEditable } = useNoteContext();

  const handlePin = async (e) => {
    e.stopPropagation();
    // if (isEditable){
    try {
      await updateDoc(doc(db, "notes", id), {
        pinned: !isPinned,
      });
      toast.success(isPinned ? "UnPinned Successfully" : "Pinned Successfully");
      updateLocalStorage(id, { pinned: !isPinned });
      setIsEditable(false);
      fetchNotes();
    } catch (error) {
      toast.error("Unable to Pin the Note");
    }
    // }else{
    //   toast.error("Sorry Your are not have right to change the note")
    // }
  };

  return (
    <>
      <div
        className="rounded-lg shadow-lg p-4 mb-4"
        style={{ backgroundColor: bg }}
      >
        <div className="flex-col">
          <div className="flex items-start">
            <div className="flex">
              <div className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
                {time.date}
              </div>
              <div className="border mx-2 border-black my-1"></div>
              <div className="flex flex-col justify-between">
                <div className="text-md font-bold text-gray-800 dark:text-white">
                  {time.month}-{time.year}
                </div>
                <div className="text-md font-bold text-gray-800 dark:text-white">
                  <div>
                    {time.hr}:{time.min}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ml-auto text-2xl"
              onClick={(e) => {
                // if (isEditable) {
                handlePin(e);
                // }
              }}
            >
              {isPinned ? <TiPin /> : <TiPinOutline />}
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </div>
          <div className="mt-2 text-gray-700 dark:text-gray-300">{body}</div>
        </div>

        <div className="mt-4 text-sm text-blue-500 uppercase font-semibold">
          {category}
        </div>
      </div>
    </>
  );
};

export default NoteCard;
