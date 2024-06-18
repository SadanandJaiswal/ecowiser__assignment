const saveToLocalStorage = (id, noteData) => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({id, ...noteData});
  localStorage.setItem("notes", JSON.stringify(notes));
};

const updateLocalStorage = (id, updatedData) => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const updatedNotes = notes.map(note => 
    note.id === id ? { ...note, ...updatedData } : note
  );
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
};

const deleteFromLocalStorage = (id) => {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const updatedNotes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
};

export { saveToLocalStorage, updateLocalStorage, deleteFromLocalStorage };
