const React = require('react');

const NoteNew = require('./NoteNew');
const Note = require('./Note');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
  }
 render() {
   const createNoteComponent = (currentNote) => {
      /* TODO Section 8: Add code for delete */
      return (
        <div>
        <Note
          key={currentNote.noteId}
          note={currentNote}
          saveNote={this.props.saveNote}
          notebookId={this.props.notebookId}
          deleteNote={this.props.deleteNote}
        />
        </div>
      );
    };

    return(
      <div>
       <h2>{this.props.notebook.title}{/*'Inside notebooktitle activenotebook of ID '+this.props.notebook.id*/}</h2>
         <ul>
           {this.props.notes.map(createNoteComponent)}
         </ul>
       <NoteNew createNote={this.props.createNote} notebookId={this.props.notebookId}/>
      </div>
    );
  }
}

module.exports = ActiveNotebook;