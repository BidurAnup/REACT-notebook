const _ = require('lodash');
const api = require('../helpers/api');
const notesActionReducer = require('./notes');

// Action type constants
/* *** TODO: Put action constants here *** */
const SET_ACTIVE = 'blog-frontend/notebooks/SET_ACTIVE';
const INSERT = 'blog-frontend/notebooks/INSERT';
const REMOVE = 'blog-frontend/notebooks/REMOVE';

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ],
  activeNotebookId: -1,
  notes: [],
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT:{
      const unsortedNotebooks = _.concat(state.data, action.notebooks);
      const data = _.orderBy(unsortedNotebooks, 'createdAt','desc');
      // Return updated state
      return _.assign({}, state, { data} );
    }

    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, { data });
    }

    case SET_ACTIVE: {
      console.log('activeNotebookId  ' + state.activeNotebookId);
    	return _.assign({}, state, { activeNotebookId: action.notebookId });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
// Inserts notebooks into the NotebookList
reducer.insertNotebooks = (notebooks) => {
  return{type: INSERT, notebooks};
};

// Removes a post from the visible post list
reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

reducer.setActive = (notebookId) => {
  //console.log(id);
  return {type: SET_ACTIVE, notebookId};
};

// Attempts to save notebook in server/database and inserts it in data to display
// in front end
reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      // This Notebook is one that the store returns us! It has Notebook id incremented to the next available id
      dispatch(reducer.insertNotebooks([notebook]));
      console.log('createNotebook in notebooks');
      callback();
    }).catch(() => {
      alert('Failed to create Notebook "FROM notebooks REDUCER". Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to delete a notebook from the server and removes it from the data
// Notebook list if successful
reducer.deleteNotebook = (id) => {
  return (dispatch) => {
    api.delete('/notebooks/' + id).then((notebook) => {
      dispatch(reducer.removeNotebook(id));
    }).catch(() => {
      alert('Failed to delete Notebook.  Are all of the fields filled in correctly?');
    });
  };
};

reducer.loadData = (notebookId) => {
	return (dispatch) => {
    console.log('/notebooks/' + notebookId + '/notes')
      dispatch(notesActionReducer.loadNotes(notebookId));
      //dispatch({ type: SET_ACTIVE, notebookId });
  };
};
/*reducer.loadData = (notebookId) => {
	return (dispatch) => {
      dispatch({ type: SET_ACTIVE, notebookId });
      dispatch(notesActionReducer.loadNotes(notebookId));
  };
};*/
// Export the action creators and reducer
module.exports = reducer;
