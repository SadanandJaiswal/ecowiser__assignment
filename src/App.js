import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import 'react-toastify/dist/ReactToastify.css';
import { useNoteContext } from './NoteContext';

const App = () => {
  const { fetchNotes } = useNoteContext();
  // const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes()
  }, []);
  
  return (
    <>
      <Navbar />
      <CardList />
    </>
  );
};

export default App;
