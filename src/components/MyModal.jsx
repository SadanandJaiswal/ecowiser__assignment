import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {db} from "../firebase";
import { toast } from 'react-toastify';
import {saveToLocalStorage, updateLocalStorage, deleteFromLocalStorage} from "../utils";
import { useNoteContext } from '../NoteContext';

// Set the app element for accessibility purposes
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
};

const MyModal = ({ isOpen, onRequestClose, isUpdate, currNote }) => {
  const {fetchNotes, myNotes } = useNoteContext();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [noteID, setNoteID] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const categories = [
    'Personal', 'Work', 'Ideas', 'Shopping', 'Health', 'Finance', 'Study', 'Travel', 'Recipes', 'Books/Movies'
  ];
  
  useEffect(() => {
    setTitle(currNote?.title || '');
    setBody(currNote?.body || '');
    setSelectedCategory(currNote?.category || '');
    setNoteID(currNote?.id || '');
    setIsPinned(currNote?.pinned || false);

    const isInMyNotes = myNotes.some((myNote) => myNote.id === noteID);
    setIsEditable(isInMyNotes);

    // alert(currNote?.id);
     // Assuming currNote has a 'category' field
  }, [currNote]);


  const handleSubmit = async () => {
    const finalCategory = customCategory.trim() !== '' ? customCategory : selectedCategory;
    const currentDate = new Date();
    const noteData = {
      title: title,
      body: body,
      category: finalCategory,
      pinned: isPinned,
      createdAt: new Date(),
      time: {
        hr: new Date().getHours(),
        min: new Date().getMinutes(),
        date: new Date().getDate(),
        month: currentDate.toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear()
      }
    };

    try {
      if (isUpdate) {
        const docRef = await updateDoc(doc(db, 'notes', noteID), noteData);
        toast.success('Note Updated successfully');
        updateLocalStorage(noteID, noteData)
        // console.log('Document updated successfully:', noteID);
      } else {
        const docRef = await addDoc(collection(db, 'notes'), noteData);
        toast.success('Note Added successfully');
        // console.log('result')
        // console.log(docRef.id);
        saveToLocalStorage(docRef.id, noteData);
        // console.log('Document written with ID:', docRef.id);
      }
      fetchNotes();
      onRequestClose(); 
    } catch (error) {
      toast.error(error.message);
      // console.error('Error saving document:', error.message);
    }

  };

  // const saveToLocalStorage = (noteData) => {
  //   const notes = JSON.parse(localStorage.getItem('notes')) || [];
  //   notes.push(noteData);
  //   localStorage.setItem('notes', JSON.stringify(notes));
  // };
  
  // const updateLocalStorage = (id, noteData) => {
  //   const notes = JSON.parse(localStorage.getItem('notes')) || [];
  //   const updatedNotes = notes.map(note => note.id === id ? { id, ...noteData } : note);
  //   localStorage.setItem('notes', JSON.stringify(updatedNotes));
  // };

  const handleDelete = async ()=>{
    let flag = window.confirm("Are you Sure you want to Delete the note?");
    if(flag){
      try {
        const docRef = await deleteDoc(doc(db, 'notes', noteID));
        toast.success('Document deleted successfully');
        deleteFromLocalStorage(noteID);
        // console.log('Document deleted successfully:', noteID);
        fetchNotes();
        onRequestClose();
      } catch (error) {
        toast.error(error.message);
        console.error('Error deleting document:', error.message);
      }
    }
  }

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    if (selectedValue === 'Others') {
      setCustomCategory('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Note Modal"
    >
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl">{isUpdate ? 'Update Note' : 'New Note'}</h2>
        <button onClick={()=>{onRequestClose(); setIsEditable(false);}} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Select a category...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="Others">Others</option>
        </select>
        {selectedCategory === 'Others' && (
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Enter custom category"
            className="w-full border border-gray-300 rounded px-2 py-1 mt-2"
          />
        )}
      </div>
      {
        (isEditable || !isUpdate) && 
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
        >
          {isUpdate? "Update Note" : "Add New Note"}
        </button>
      }
      {isEditable && isUpdate && 
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Delete Note
        </button>
      }
    </Modal>
  );
};

export default MyModal;
