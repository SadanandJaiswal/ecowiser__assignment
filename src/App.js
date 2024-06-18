import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import 'react-toastify/dist/ReactToastify.css';
import { useNoteContext } from './NoteContext';

const App = () => {
  const { notes, fetchNotes } = useNoteContext();
  // const [notes, setNotes] = useState([]);

  useEffect(() => {
    // const savedNotes = JSON.parse(localStorage.getItem('notes'));
    // if (savedNotes) {
    //   setNotes(savedNotes);
    // }
    fetchNotes()
    // setNotes();
  }, []);

  // useEffect(()=>{
  //   console.log(notes);
  //   setTimeout(() => {
  //     console.log("this is notes")
  //     console.log(notes);
  //   }, 2000);
  // },[notes])
  
  return (
    // <ModalProvider>
    //   <div className="container mx-auto mt-8 p-4">
    <>
        <Navbar />
        <CardList />
        {/* <ToastContainer /> */}

        {/* <div className="container">
          <ul>
            {notes?.map(note => (
              <li key={note.id}>
                <strong>{note.title}</strong>: {note.body}
              </li>
            ))}
          </ul>
          
        </div> */}
    </>
    //   </div>
    // </ModalProvider>
  );
};

export default App;
