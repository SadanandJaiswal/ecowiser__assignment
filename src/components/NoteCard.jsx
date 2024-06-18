import React, {useContext, useState} from "react";
// import { ModalContext } from '../ModalContext';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {db} from "../firebase";
import { toast } from 'react-toastify';
import { TiPinOutline, TiPin } from 'react-icons/ti';
import MyModal from "./MyModal";
import {saveToLocalStorage, updateLocalStorage} from "../utils";
import { useNoteContext } from '../NoteContext';


const NoteCard = ({ time, emoji, title, body, category, bg, id, isPinned, isEditable}) => {
  const {fetchNotes } = useNoteContext();

  const handlePin = async (e)=>{
    // e.preventDefault();
    e.stopPropagation();
    // alert("hello pin")
    // alert(id);
    try{
      const docRef = await updateDoc(doc(db, 'notes', id), { pinned: !isPinned });
      toast.success(isPinned? 'UnPinned Successfully' : 'Pinned Successfully');
      updateLocalStorage(id, { pinned: !isPinned });
      fetchNotes();
    }
    catch(error){
      toast.error("Unable to Pin the Note")
    }
  }

  return (
    <>
      <div className="rounded-lg shadow-lg p-4 mb-4" style={{ backgroundColor: bg }}>
          <div className="flex-col">
              {/* Part 1: Date, Time, Emoji */}
              <div className="flex items-start">
                  {/* Date */}
                  <div className="flex">
                      <div className="flex items-center text-2xl font-bold text-gray-800 dark:text-white">
                          {time.date}
                      </div>
                      <div className="border mx-2 border-black my-1"></div>
                      <div className="flex flex-col justify-between">
                      <div className="text-md font-bold text-gray-800 dark:text-white">
                          {/* {formattedDate} */}
                          {time.month}-{time.year}
                      </div>
                      <div className="text-md font-bold text-gray-800 dark:text-white">
                          {/* {formattedDate} */}
                              <div>{time.hr}:{time.min}</div>
                      </div>
                      {/* <div className="flex flex-col">
                          <div className="h-1/2 border-b border-gray-300 dark:border-gray-600"></div>
                          <div className="h-1/2 flex items-end text-xs text-gray-500 dark:text-gray-400">
                          {time && (
                              <>
                              <div>{time.month}-{time.year}</div>
                              </>
                          )}
                          </div>
                      </div> */}
                      </div>
                  </div>
                  {/* Emoji */}
                  
                  <div className="ml-auto text-2xl" onClick={(e)=>{
                    if(isEditable){
                    handlePin(e);
                  }
                  }}>
                    {isPinned ? <TiPin /> : <TiPinOutline  /> }
                  </div>

              </div>

              {/* <hr className="border-0 h-[2px] w-[100%] mx-auto bg-black mt-2"/> */}

              {/* Part 2: Title */}
              <div className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                  {title}
              </div>

              {/* Part 3: Body */}
              <div className="mt-2 text-gray-700 dark:text-gray-300">{body}</div>
          </div>

        {/* Part 4: Category */}
        <div className="mt-4 text-sm text-blue-500 uppercase font-semibold">
          {category}
        </div>
      </div>
      {/* <MyModal isOpen={isOpen} closeModal={closeModal} /> */}
    </>
  );
};

export default NoteCard;
