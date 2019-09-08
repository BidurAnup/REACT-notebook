const _ = require('lodash');
const api = require('../helpers/api');
const notesbooksActionReducer = require('./notebooks');

const FETCH = 'blog-frontend/notes/FETCH';
const GET_NOTES = 'blog-frontend/notebooks/GET_NOTES';
const INSERT = 'blog-frontend/notes/INSERT';
const CHANGE = 'blog-frontend/notes/CHANGE';
const REMOVE = 'blog-frontend/notes/REMOVE';

const initialState = {
  notes: [
  ],
  notebookId: -1
};

function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
      /* *** TODO: Put per-action code here *** */
      case INSERT:{
      const unsortedNotes = _.concat(state.notes, action.note);
      const visibleNotes = _.orderBy(unsortedNotes, 'createdAt','desc');
      // Return updated state
      return _.assign({}, state, {notes:visibleNotes} );
    }


    case GET_NOTES: {
      const notes = _.orderBy(action.notes, 'createdAt','desc');
      return _.assign({}, state, {notes, notebookId: action.notebookId} );
    }

    case CHANGE: {
      const notes = _.clone(state.notes);
      const changedIndex = _.findIndex(state.notes, {id: action.note.id })
      notes[changedIndex] = action.note;
      return _.assign({}, state, { notes });
    }

    // Removes a single post from the visible post list
    case REMOVE: {
      const notes = _.reject(state.notes, {id: action.id});
      return _.assign({}, state, { notes });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insertNotes = (note) => {
  return{type: INSERT, note};
};

// Changes local post data
reducer.changeNote = (note) => {
  return { type: CHANGE, note };
};

// Delete Note
// Removes a post from the visible note list
reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};

// Attempts to delete a post from the server and removes it from the visible
// post list if successful
reducer.deleteNote = (noteId) => {
   // TODO Section 8: Add code to perform delete
   return (dispatch) => {
    api.delete('/notes/' + noteId).then(() => {
      dispatch(reducer.removeNote(noteId));
    }).catch(() => {
      alert('Failed to delete note.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to update a post on the server and updates local post data if
// successful
reducer.saveNote = (editedNote, callback) => {
  return (dispatch) => {
    api.put('/notes/' + editedNote.id, editedNote).then((note) => {
      // Saves local post.
      dispatch(reducer.changeNote(note));
      callback();
    }).catch(() => {
      alert('Failed to save post.  Are all of the fields filled in correctly?');
    });
  };
};
// Attempts to save note in server/database and inserts it in data to display
// in front end
reducer.createNote=(note,callback)=>{
  return (dispatch)=>{
    api.post('/notes',note).then((note) => {
      //console.log(newNoteId);
      // This Notebook is one that the store returns us! It has Notebook id incremented to the next available id
      dispatch(reducer.insertNotes(note));
      //callback();
    })
    .catch(err=>alert(err.message));
  };
};

// Method to load notes which is called via notebooks reducer
reducer.loadNotes = (notebookId) => {
	return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      dispatch({ type: GET_NOTES, notebookId, notes })
    }).catch((error) => {
      (error);
    });
 };
};

// Action creator for loading an notebook's notes
module.exports = reducer;