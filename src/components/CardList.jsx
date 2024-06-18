import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MyModal from "./MyModal";
import { useNoteContext } from "../NoteContext";

const CardList = () => {
  const { myNotes, notes, isEditable, setIsEditable } = useNoteContext();
  const [currentPage, setCurrentPage] = useState(0);
  const notesPerPage = 6;

  const [currNote, setCurrNote] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = (note) => {
    console.log("New Note:", note);
  };

  const indexOfLastNote = (currentPage + 1) * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes?.slice(indexOfFirstNote, indexOfLastNote);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const checkIsEditable = (noteID) => {
    myNotes.some((myNote) => {
      if (myNote.id === noteID) {
        setIsEditable(true);
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    console.log(isEditable);
  }, [isEditable]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden px-3 sm:px-0">
          {currentNotes?.map((note, index) => {
            return (
              <div
                className="overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[103%]"
                key={index}
                onClick={() => {
                  openModal();
                  setCurrNote(note);
                  checkIsEditable(note.id);
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
                />
              </div>
            );
          })}
        </div>
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
