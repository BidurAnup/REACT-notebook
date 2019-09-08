const React = require('react');
const NotebookEdit = require('./NotebookEdit');

/**
 * A button which expands into a form for writing a new post.
 */
class NotebookNew extends React.Component {
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

    const createNotebook = (NewNotebook) => {
      this.props.createNotebook(NewNotebook, (err) => {
        if(!err) closeEdit();
      });
    };

    // TODO Section 7: Write code to switch to create New not edit mode when editing is clicked
        if (this.state.editing) {
      // Render component for editing the post
      return (
        <NotebookEdit
          Notebook={this.props.Notebook}
          onSave={createNotebook}
          onCancel={closeEdit}
        />
      );
    }

    return (
      <button className="blog-load-more btn btn-primary btn-lg"
        onClick={openEdit}
      >
       +NewNotebook
      </button>
    );
  }
}

module.exports = NotebookNew;
