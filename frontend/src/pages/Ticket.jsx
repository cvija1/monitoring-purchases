import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getPurchase,
  closePurchase,
} from "../features/purchases/purchaseSlice";
import {
  getNotes,
  createNote,
  reset as notesReset,
} from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { purchaseId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }

    dispatch(getPurchase(purchaseId));
    dispatch(getNotes(purchaseId));

    //eslint-disable-next-line
  }, [isError, message, ticketId]);
  const onTicketClose = () => {
    dispatch(closePurchase(purchaseId));
    toast.success("Ticket closed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    navigate("/tickets");
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, purchaseId }));
    closeModal();
    setNoteText("");
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setNoteText("");
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something went wrong</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-GB")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
