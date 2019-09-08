const React = require('react');
const NoteEdit = require('./NoteEdit');

/**
 * A button which expands into a form for writing a new NOte.
 */
class NoteNew extends React.Component {
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

    const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

    // TODO Section 7: Write code to switch to create New not edit mode when editing is clicked
        if (this.state.editing) {
      // Render component for editing the post
      return (
        <NoteEdit
          note={this.props.note}
          onNoteSave={createNote}
          content={this.props.content}
          onCancel={closeEdit}
          notebookId={this.props.notebookId}
        />
      );
    }

    return (
     <button className="blog-load-more btn btn-primary btn-lg"
        onClick={openEdit}
      >
        +NewNote
      </button>

    );
  }
}

module.exports = NoteNew;
