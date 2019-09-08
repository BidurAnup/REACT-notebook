const React = require('react');

const NoteEdit = require('./NoteEdit');
const NoteView = require('./NoteView');

class Note extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const saveEdit = (editedNote) => {
      this.props.saveNote(editedNote, (err) => {
        if(!err) closeEdit();
      });
    };

    // TODO Section 8: Add code for delete
    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
    };

    if(this.state.editing) {
      // Render component for editing the post
      return (
        <NoteEdit
          note={this.props.note}
          onNoteSave={saveEdit}
          onCancel={closeEdit}
          notebookId={this.props.notebookId}
        />
      );
    }
    // Render read-only view of the post
    // TODO Section 8: add code for delete
    return (
      <NoteView
        note={this.props.note}
        onDeleteNote={deleteThisNote}
        onEdit={openEdit}
      />
    );
  }
}

// Export the Note component
module.exports = Note;