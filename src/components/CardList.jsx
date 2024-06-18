import React, { useState } from "react";
import NoteCard from "./NoteCard";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MyModal from "./MyModal";
import { useNoteContext } from "../NoteContext";

const CardList = () => {
  const {myNotes, notes} = useNoteContext();
  const [currentPage, setCurrentPage] = useState(0); // Changed to zero-based index for react-paginate
  const notesPerPage = 6;

  const [currNote, setCurrNote] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = (note) => {
    console.log("New Note:", note);
    // Handle the submitted note (e.g., save it to state or send to a server)
  };

  // Calculate pagination
  const indexOfLastNote = (currentPage + 1) * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes?.slice(indexOfFirstNote, indexOfLastNote);

  // Function to handle pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update current page index from react-paginate
  };

  const cardColors = [
    "#FEE2E2", // Light Red
    "#FEF3C7", // Light Yellow
    "#D1FAE5", // Light Green
    "#E0F2FE", // Light Blue
    "#EDE9FE", // Light Purple
    "#FFF7ED", // Light Orange
  ];

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
          {currentNotes?.map((note, index) => {
            const isInMyNotes = myNotes.some((myNote) => myNote.id === note.id);
            return (
              <div
                className="overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[103%]"
                key={index}
                onClick={() => {
                  openModal();
                  setCurrNote(note);
                  // if (isInMyNotes) {
                  // }
                }}
              >
                <NoteCard
                  note={note}
                  time={note.time}
                  emoji={note?.emoji}
                  title={note.title}
                  body={note.body}
                  category={note.category}
                  bg={cardColors[index % cardColors?.length]}
                  id={note.id}
                  isPinned={note.pinned}
                  isEditable={isInMyNotes}
                />
              </div>
            );
          })}
        </div>
        {/* React Paginate component */}
        {notes?.length > notesPerPage && (
          <div className="flex justify-center">
            <ReactPaginate
              previousLabel={<FaArrowLeft />}
              nextLabel={<FaArrowRight />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(notes?.length / notesPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
            />
          </div>
        )}
      </div>

      <MyModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleSubmit}
        currNote={currNote}
        isUpdate={true}
      />
    </>
  );
};

export default CardList;
