import React, {useState, useReducer} from 'react'
import {v4 as uuid} from 'uuid'
import "./App.css"

const initialState = {
  id: null,
  lastNoteCreated: null,
  notes: []
}

const notesReducer = (prevState, action) => {
  switch(action.type) {
    case 'ADD_NOTE': {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0,8),
        notes: [...prevState.notes, action.payload]
      }
      console.log('after add_note', newState)
      return newState
    }
  }
}


function App() {
  const [noteInput, setNoteInput] = useState('')
  const [notesState, dispatch] = useReducer(notesReducer, initialState)
  const addNote = event => {
    event.preventDefault()

    if(!noteInput) {
      return
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 100)
    }
    console.log(newNote)
    dispatch({type: "ADD_NOTE", payload: newNote})
  }
  return (


    <div className="App">
      <h1>
        Sticky Notes
      </h1>
      <form onSubmit={addNote} >
        <textArea
        value={noteInput}
        onChange={event => setNoteInput(event.target.value)}
        placeholder="create a new note"></textArea>
        <button>Add</button>
      </form>
    {notesState.notes.map(note => {
      <div className="note">
        {note.text}
      </div>
    })}
    </div>
  );
}

export default App;
