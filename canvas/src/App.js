import React, { useState, useReducer } from "react";
import { v4 as uuid } from "uuid";
import Draggable from "react-draggable";
import "./index.css";

const initialState = {
  id: null,
  lastNoteCreated: null,
  notes: [],
  defaultPos: { x: 100, y: 0 }
};

const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        notes: [...prevState.notes, action.payload],
      };
      console.log("after add_note", newState);
      return newState;
    }
    case "DELETE_NOTE": {
      const newState = {
        ...prevState,
        notes: prevState.notes.filter(note => note.id !== action.payload.id)
      }
      console.log('after delete', newState)
      return newState
    }
    // case "UPDATE_POS": {
    //   const newState = {
    //     ...prevState,
    //     notes: [...prevState.notes, action.payload]
    //   }
    //   console.log('persist', newState)
    //   return newState
    // }
    case "CLEAR": {
      const newState = {
        ...prevState,
        notes: []
      }
      return newState
    }
    default:
      return initialState
  }
};


function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notesState, dispatch] = useReducer(notesReducer, initialState);
  const addNote = (event) => {
    event.preventDefault();

    if (!noteInput) {
      return;
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      defaultPos: { x: 100, y: 0 },
      color: "bg-yellow-200"
    };
    console.log(newNote);
    dispatch({ type: "ADD_NOTE", payload: newNote });
  };


  return (
    <>

      <div className="container w-full max-w-xs mx-auto mt-8 px-4 font-sans">
        <form
          className="bg-yellow-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={addNote}
        >
          <textArea
            value={noteInput}
            onChange={(event) => setNoteInput(event.target.value)}
            placeholder="Create new note..." className="bg-yellow-200 appearance-none border-none border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-200"
          ></textArea>
          <button>Add</button>
        </form>
        {notesState.notes.map((note, index) => {
          return (
            <Draggable key={note.id} defaultPosition={note.defaultPos} onStop={(e, note) => {
              // dispatch({ type: "UPDATE_POS", payload: note })
            }}>
              <div className={`${note.color} shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 break-words`}>
                {note.text}
                <button onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg></button>
              </div>
            </Draggable>
          )
        })}
      </div >
      <button onClick={() => dispatch({ type: "CLEAR" })}>clear</button>

    </>
  );
}

export default App;
