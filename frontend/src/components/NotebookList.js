const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const Notebook = require('./Notebook')
const ActiveNotebook = require('./ActiveNotebook');
const NotebookNew = require('./NotebookNew');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
  render() {
    const createNotebookListItem = (notebook) => {
      if(notebook.id == this.props.notebooks.activeNotebookId){
        return (
          <ActiveNotebook
          key={notebook.id}
          notebook={notebook}
          notebookId={notebook.id}/// was missing this one to pass to child comp
          notes={this.props.notes.notes}
          createNote={this.props.createNote}
          deleteNote={this.props.deleteNote}
          saveNote={this.props.saveNote}
         // notes={loadData(this.props.notebook.id)}
          loadData={this.props.loadData}
          //data={this.props.data}
          />
        );
      }
      return(
          <Notebook
          key={notebook.id}
          notebook={notebook}
          loadData={this.props.loadData}
          deleteNotebook={this.props.deleteNotebook}
          setActive={this.props.setActive}// added to test set active notebook
          />
        )
      }

    return (
      <div>
        <h2>Notebooks</h2>
        <h2>It should be working!</h2>
        <div id = 'top-bar-create-notebook'>
          {/* Button for writing a new notebook */}
          {<NotebookNew createNotebook={this.props.createNotebook}
          />}
        </div>

        <ul>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    activeNotebookId: state.notebooks.activeNotebookId,
    data: state.data,
    notes: state.notes
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
