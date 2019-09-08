const React = require('react');


const NotebookView = require('./NotebookView');

class Notebook extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
  //  this.state = { editing: false };
  }

  render() {
    const deleteThisNotebook = () => {
      this.props.deleteNotebook(this.props.notebook.id);
    };

    return(
      <NotebookView
        notebook={this.props.notebook}
        onDelete={deleteThisNotebook}
        loadData={this.props.loadData}
        setActive={this.props.setActive}
      />
    );
  }
}

module.exports = Notebook;