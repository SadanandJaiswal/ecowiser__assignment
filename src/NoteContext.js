import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [myNotes, setMyNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectNote, setSelectNote] = useState('allNotes'); // 'myNotes' or 'allNotes'

  useEffect(() => {
    fetchAllNotes();
    fetchMyNotes();
  }, []);

  useEffect(() => {
    console.log('myNotes:', myNotes);
    if (selectNote === 'myNotes') {
      setNotes(myNotes)
    }
  }, [myNotes]);

  useEffect(() => {
    console.log('allNotes:', allNotes);
    if (selectNote === 'allNotes') {
      setNotes(allNotes)
    }
  }, [allNotes]);

  useEffect(() => {
    console.log('selectNote:', selectNote);
    fetchNotes();
  }, [selectNote]);

  const fetchMyNotes = () => {
    try {
      const savedMyNotes = JSON.parse(localStorage.getItem('notes')) || [];
      
      const pinnedNotes = savedMyNotes.filter(note => note.pinned);
      const unpinnedNotes = savedMyNotes.filter(note => !note.pinned);
  
      pinnedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      unpinnedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      const sortedNotes = [...pinnedNotes, ...unpinnedNotes];
  
      setMyNotes(sortedNotes);
    } catch (error) {
      console.error('Error fetching my notes:', error);
      toast.error('Error fetching my notes');
    }
  };

  const fetchAllNotes = async () => {
    try {
      const q = query(
        collection(db, 'notes'),
        orderBy('pinned', 'desc'), // Sort by pinned status: true first
        orderBy('createdAt', 'desc') // Then sort by createdAt: latest first
      );
      const querySnapshot = await getDocs(q);
      const notesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllNotes(notesArray);
      // toast.success('All Notes Fetched Successfully');
    } catch (error) {
      console.error('Error fetching all notes:', error);
      toast.error('Error fetching all notes');
    }
  };

  const fetchNotes = () => {
    if (selectNote === 'myNotes') {
      fetchMyNotes();
      // setNotes(myNotes)
    } else {
      fetchAllNotes();
      // setNotes(allNotes)
    }
  };

  return (
    <NoteContext.Provider value={{ notes, myNotes, allNotes, selectNote, setSelectNote, fetchNotes, fetchAllNotes }}>
      <ToastContainer />
      {children}
    </NoteContext.Provider>
  );
};
